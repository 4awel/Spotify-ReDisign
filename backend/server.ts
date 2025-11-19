import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose, { model, Schema } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { error, log, trace } from "console";
import type { Artist, Track } from "~/types";

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT_SERVER || "4000";
const PORT_CLIENT: string = process.env.PORT || "3008";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/DBPspotify";

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

const formSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  comment: { type: String, require: true },
});

const Form = mongoose.model("Form", formSchema);

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

app.get("/deezer/api", async (req: Request, res: Response) => {
  try {
    const response = await axios(
      "https://api.deezer.com/search?q=MAKE FAMILY NOT FRIENDS&limit=300"
    );
    const data = response.data;

    if (!response.data) {
      throw new Error("Error fetch API data!");
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
    }));
    res.status(200).send(chartTracks);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.json({ message: `Error fetch to client: ${err}` });
    } else {
      res.json({ message: `Unkwnown error: ${err}` });
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
        `https://api.deezer.com/search?q=${validationValue}&limit=20`
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
      return res.status(500).send(`Unknown error: ${error}`);
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
      return res.status(500).send(`Unknown error: ${error}`);
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
