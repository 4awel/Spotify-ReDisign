interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  previewUrl: string;
  artistId: number;
  albumId: number;
  isExplicit: boolean;
  rank?: number;
}

interface Artist {
  id: number;
  name: string;
  picture: string;
  tracklist: string;
}

interface Album {
  id: number;
  title: string;
  coverUrl: string;
  artist: string;
  tracklist: string;
}

interface TrackListState {
  chartTracks: Track[];
  favoriteTracks: Track[];
  loading: boolean;
  error: string | null;
  currentTrack: Track | null;
  currentPlaylist: Track[];
  isPlaying: boolean;
  currentIndex: number;
}

import axios from "axios";

export const useTracklistStore = defineStore("tracklist", () => {
  // State
  const state = reactive<TrackListState>({
    chartTracks: [],
    favoriteTracks: [],
    loading: false,
    error: null,
    currentTrack: null, 
    currentPlaylist: [], 
    isPlaying: false, 
    currentIndex: 0,
  });

  // Getters
  const chartTracks = computed(() => state.chartTracks);
  const favoriteTracks = computed(() => state.favoriteTracks);
  const isLoading = computed(() => state.loading);
  const hasError = computed(() => state.error);

  // Action
  const getChartTracks = async () => {
    state.loading = true;
    state.error = null;

    try {
      const response = await axios(`http://localhost:4000/deezer/api`);
      state.chartTracks = response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
      console.log(error);
    } finally {
      state.loading = false;
    }
  };

  const getTrackOut = (tracklist: Track[]) => {
    state.chartTracks = tracklist;
  };

  return {
    // Getters
    chartTracks,
    favoriteTracks,
    isLoading,
    hasError,
    // Actions
    getChartTracks,
    getTrackOut,
  };
});
