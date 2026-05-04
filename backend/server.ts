import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose, { model, Schema } from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT_SERVER || "4000";
const PORT_CLIENT: string = process.env.PORT || "3008";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/DBSpotify";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: `http://localhost:${PORT_CLIENT}`,
  })
);

app.use(express.json());

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedTracks: [
      {
        trackId: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

interface DeezerTrack {
  id: number;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  time_add: number;
  artist: DeezerArtist;
  album: DeezerAlbum;
  type: string;
}

interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

interface DeezerAlbum {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  tracklist: string;
  type: string;
}

interface UserType {
  email: string;
  username: string;
  password: string;
  likedTracks: [
    {
      trackId?: number;
      isLiked?: boolean;
      atliked?: Date;
    }
  ];
}

app.get("/deezer/api", async (req: Request, res: Response) => {
  const { userId } = req.query;
  console.log("Id", userId);
  try {
    const response = await axios(
      "https://api.deezer.com/search?q=MAKE FAMILY NOT FRIENDS&limit=300"
    );
    const data = response.data;

    if (!response.data) {
      throw new Error("Error fetch API data!");
    }

    let userLikedTracks: string[] = [];
    if (!userId) {
      return res.status(404).send("Unknown params");
    } else {
      const user = await User.findOne({ _id: userId });
      if (user && user.likedTracks) {
        userLikedTracks = user.likedTracks.map((track: any) =>
          track.trackId.toString()
        );
      }
    }

    const chartTracks = data.data.map((track: DeezerTrack) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      album: track.album.title,
      duration: track.duration,
      coverUrl: track.album.cover_medium,
      previewUrl: track.preview,
      artistId: track.artist.id,
      albumId: track.album.id,
      isExplicit: track.explicit_lyrics,
      rank: track.rank,
      isLiked: userId ? userLikedTracks.includes(track.id.toString()) : false,
    }));
    res.status(200).send(chartTracks);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.json({ message: `Error fetch to client: ${err}` });
    } else {
      res.json({ message: `Unkwnown error /deezer/api: ${err}` });
    }
    console.log("Error api fetch", err);
  }
});

app.get("/deezer/search", async (req: Request, res: Response) => {
  const { value } = req.query;
  console.log("val", value);
  let validationValue;
  if (typeof value === "string") {
    validationValue = value?.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "");
  } else {
    return res.status(400).send("Invalid value parameter");
  }
  try {
    if (validationValue) {
      const responseTrack = await axios(
        `https://api.deezer.com/search?q=${validationValue}&limit=30`
      );
      if (
        !responseTrack.data ||
        !responseTrack.data.data ||
        responseTrack.data.data === 0
      ) {
        return res.status(404).send("Not found");
      }
      const dataTrack = responseTrack.data;
      const trackListData = dataTrack.data.map((track: DeezerTrack) => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        duration: track.duration,
        coverUrl: track.album.cover_medium,
        previewUrl: track.preview,
        artistId: track.artist.id,
        albumId: track.album.id,
        isExplicit: track.explicit_lyrics,
        rank: track.rank,
      }));

      if (!trackListData[0] || !trackListData[0].artistId) {
        return res.status(404).send("Not artist info avalible");
      }

      try {
        const responseArtist = await axios(
          `https://api.deezer.com/artist/${trackListData[0].artistId}`
        );

        if (!responseArtist.data) {
          return res.status(404).send("Artist not found");
        }

        const dataArtist = responseArtist.data;
        const artistData = {
          id: dataArtist.id,
          name: dataArtist.name,
          picture: dataArtist.picture,
          tracklist: dataArtist.tracklist,
          type: dataArtist.type,
        } as DeezerArtist;

        const finalSendData = {
          artist: artistData,
          tracklist: trackListData,
        };

        return res.status(200).send(finalSendData);
      } catch (artistError) {
        console.log("Artist fetch error:", artistError);
        const finalSendData = {
          artist: null,
          track: trackListData,
        };
        return res.send(200).send(finalSendData);
      }
    }
  } catch (error: unknown) {
    console.log("Error api fetch", error);
    if (error instanceof Error) {
      return res.status(500).send(`Error fetch to client: ${error.message}`);
    } else {
      return res.status(500).send(`Unknown error /deezer/search: ${error}`);
    }
  }
});

app.get("/artist/playlist", async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const response = await axios(`https://api.deezer.com/artist/${id}`);
    // console.log(response);
    if (!response.data || response.data.length === 0) {
      return res.status(404).send("Artist not found");
    }
    const data = response.data;
    const responseTrackList = await axios(data.tracklist);
    if (
      !responseTrackList.data ||
      !responseTrackList.data.data ||
      responseTrackList.data.data.length === 0
    ) {
      return res.status(404).send("Track list not found");
    }
    const tracklist = responseTrackList.data.data.map((track: DeezerTrack) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      album: track.album.title,
      duration: track.duration,
      coverUrl: track.album.cover_medium,
      previewUrl: track.preview,
      artistId: track.artist.id,
      albumId: track.album.id,
      isExplicit: track.explicit_lyrics,
      rank: track.rank,
    }));

    res.status(200).send(tracklist);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).send(`Error fetch to client: ${error.message}`);
    } else {
      return res.status(500).send(`Unknown error /artist/playlist: ${error}`);
    }
  }
});

app.post("/signup", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (username && email && password) {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        likedTracks: [],
      });
      await user.save();
      console.log(user);
      res.send("User has been add!").status(201);
    } else res.send("Undefind field create user").status(401);
  } catch (err) {
    res.send(err).status(400);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email adres or password is null");
    }

    const user = await User.findOne({ email });
    const hashedPassword = user?.password;
    if (hashedPassword) {
      const isComaprePassword = await bcrypt.compare(password, hashedPassword);
      if (isComaprePassword) {
        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET!, {
          expiresIn: "3d",
        });
        res.json({ token });
      } else res.send("Invalid password").status(400);
    } else {
      res.send("Password is not found in data base");
    }
  } catch (err) {
    res.send(err).status(500);
  }
});

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload | string;
}

function aunthticetToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token && process.env.JWT_SECRET) {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: UserType) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = user;
        console.log(user);
      }
      next();
    });
  } else res.sendStatus(401);
}

app.get(
  "/user/data",
  aunthticetToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user && typeof req.user === "string") res.status(400);

      const userId = (req as any).user.id;
      const user = await User.findById(userId);
      if (!userId)
        res.status(400).json({ error: "User ID not found in token" });
      if (user) {
        res.json({
          id: user._id,
          username: user.username,
          email: user.email,
          likedTracks: user.likedTracks,
        });
      } else res.status(404).json({ error: "User not found" });
    } catch (err) {
      res.send(err).status(500).json({ err: "Server error /user/data" });
    }
  }
);

app.put("/track/liked", async (req: Request, res: Response) => {
  const { trackId, userId } = req.query;
  console.log(trackId, userId);
  try {
    if (!trackId || !userId) return res.status(400).send(`Not found`);
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).send({ error: "User not found" });

    const existingLikeIndex = user.likedTracks.findIndex(
      (track) => track.trackId.toString() === trackId.toString()
    );

    let result;

    if (existingLikeIndex !== -1) {
      // Удаляем лайк (unlike)
      user.likedTracks.splice(existingLikeIndex, 1);
      await user.save();
      result = {
        message: "Like has been removed",
        isLiked: false,
        likesCount: user.likedTracks.length,
      };
    } else {
      // Добавляем лайк
      const likeData = {
        trackId,
        isLiked: true,
        atLiked: new Date(),
      };

      user.likedTracks.push(likeData);
      await user.save();
      result = {
        message: "Like has been added",
        isLiked: true,
        likesCount: user.likedTracks.length,
      };
    }
    res.status(200).send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).send(`Error like update: ${error.message}`);
    } else {
      return res.status(500).send(`Unknown error /track/like: ${error}`);
    }
  }
});

app.get("/liked/tracklist", async (req: Request, res: Response) => {
  const { id, limit, ofset } = req.query;
  console.log("Id = ", id, limit, )
  if (!id || typeof id !== "string" || id.trim() === "") {
    return res.status(400).send("User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid user ID format");
  }

  try {
    const tracklistUser = await User.findOne({ _id: id });
    if (!tracklistUser) return res.status(404).send("User not found");

    const limitNum = limit ? parseInt(limit as string, 10) : 20;
    if (isNaN(limitNum) || limitNum <= 0) {
      return res.status(400).send("Invalid limit");
    }

    const offsetNum = ofset ? parseInt(ofset as string, 10) : 0;
    if (isNaN(offsetNum) || offsetNum < 0) {
      return res.status(400).send("Invalid offset");
    }

    const startIndex = offsetNum * limitNum;
    const endIndex = Math.min(startIndex + limitNum, tracklistUser.likedTracks.length);

    const tracklist = [];
    for (let i = startIndex; i < endIndex; i++) {
      const likedTrack = tracklistUser.likedTracks[i];
      if (!likedTrack) continue;

      try {
        const response = await axios.get(`https://api.deezer.com/track/${likedTrack.trackId}`);
        const trackData = response.data;
        const track = {
          id: trackData.id,
          title: trackData.title,
          artist: trackData.artist.name,
          album: trackData.album.title,
          duration: trackData.duration,
          coverUrl: trackData.album.cover_medium,
          previewUrl: trackData.preview,
          artistId: trackData.artist.id,
          albumId: trackData.album.id,
          isExplicit: trackData.explicit_lyrics,
          rank: trackData.rank,
        };
        tracklist.push(track);
      } catch (trackError) {
        console.error(`Error fetching track ${likedTrack.trackId}:`, trackError);
        // Skip this track
      }
    }
    // for (let likedTrack of tracklistUser.likedTracks) {

    // }
    res.status(200).send(tracklist);
  } catch (error) {
    console.error("Error fetching liked tracklist:", error);
    res.status(500).send("Internal server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
