import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch(
      "https://api.deezer.com/search?q=MAKE FAMILY NOT FRIENDS&limit=300"
    );

    const chartTracks = response.data.map((track: any) => ({
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

    return chartTracks;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch Deezer data",
    });
  }
});
