interface DeezerTrack {
  id: number
  title: string
  title_short: string
  title_version: string
  link: string
  duration: number
  rank: number
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  md5_image: string
  time_add: number
  artist: {
    id: number
    name: string
    link: string
    picture: string
    picture_small: string
    picture_medium: string
    picture_big: string
    picture_xl: string
    tracklist: string
    type: string
  }
  album: {
    id: number
    title: string
    cover: string
    cover_small: string
    cover_medium: string
    cover_big: string
    cover_xl: string
    tracklist: string
    type: string
  }
  type: string
}

interface DeezerArtist {
  id: number
  name: string
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  tracklist: string
  type: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { value } = query
  
  console.log("val", value)
  
  let validationValue: string
  if (typeof value === "string") {
    validationValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, "")
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid value parameter"
    })
  }
  
  try {
    if (validationValue) {
      // Fetch tracks from Deezer
      const responseTrack = await $fetch(`https://api.deezer.com/search?q=${validationValue}&limit=20`)
      
      if (
        !responseTrack ||
        !responseTrack.data ||
        responseTrack.data.length === 0
      ) {
        throw createError({
          statusCode: 404,
          statusMessage: "Not found"
        })
      }
      
      const dataTrack = responseTrack
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
      }))

      if (!trackListData[0] || !trackListData[0].artistId) {
        throw createError({
          statusCode: 404,
          statusMessage: "Not artist info available"
        })
      }

      try {
        // Fetch artist info
        const responseArtist = await $fetch(`https://api.deezer.com/artist/${trackListData[0].artistId}`)
        
        if (!responseArtist) {
          throw createError({
            statusCode: 404,
            statusMessage: "Artist not found"
          })
        }

        const dataArtist = responseArtist
        const artistData: DeezerArtist = {
          id: dataArtist.id,
          name: dataArtist.name,
          picture: dataArtist.picture,
          tracklist: dataArtist.tracklist,
          type: dataArtist.type,
        }

        const finalSendData = {
          artist: artistData,
          tracklist: trackListData,
        }

        return finalSendData
      } catch (artistError) {
        console.log("Artist fetch error:", artistError)
        const finalSendData = {
          artist: null,
          tracklist: trackListData,
        }
        return finalSendData
      }
    }
  } catch (error: unknown) {
    console.log("Error api fetch", error)
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetch to client: ${error.message}`
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Unknown error: ${error}`
      })
    }
  }
})