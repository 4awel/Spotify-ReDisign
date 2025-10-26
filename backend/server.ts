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
      throw new Error('Error fetch API data!')
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
        rank: track.rank
    }));
    res.status(200).send(chartTracks);
  } catch (err) {
      if (err instanceof Error) {
        res.json({message: `Error fetch to client: ${err}`})
      } else {
        res.json({message: `Unkwnown error: ${err}`})
      }
      console.log('Error api fetch', err);
  }
});

app.get("/deezer/search", async (req: Request, res: Response) => {
  const { value } = req.query;
  console.log('val', value);
  let validationValue;
  if (typeof value === 'string') {
    validationValue = value?.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
  } else {
    res.status(400);
  }
  try {
    if (validationValue) {
      const response = await axios(`https://api.deezer.com/search?q=${validationValue}&limit=10`);
      const data = response.data;
      console.log(data)
      res.status(200).send(data);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.json({ message: `Error fetch to client: ${error}` })
    } else {
      res.json({ message: `Unknown error: ${error}` });
    }
    console.log('Error api fetch', error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
