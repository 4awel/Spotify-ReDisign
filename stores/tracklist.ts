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
  isLiked: boolean
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
    isLiked: false
  });

  // Getters
  const chartTracks = computed(() => state.chartTracks);
  const favoriteTracks = computed(() => state.favoriteTracks);
  const isLoading = computed(() => state.loading);
  const hasError = computed(() => state.error);
  const currentTrack = computed(() => state.currentTrack);
  const currentPlaylist = computed(() => state.currentPlaylist);
  const currentIndex = computed(() => state.currentIndex);
  const isPlaying = computed(() => state.isPlaying);
  const isLiked = computed(() => state.isLiked);

  // Action

const getChartTracks = async () => {
  state.loading = true;
  state.error = null;

  try {
    const { data, error } = await useFetch('/api/deezer');
    
    if (error.value) {
      throw new Error(error.value.message);
    }
    
    state.chartTracks = data.value;
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

  const setCurrentTrack = (track: Track, index: number = 0) => {
    state.currentTrack = track;
    state.currentIndex = index;
    state.isPlaying = true;
  };

  const setCurrentIndex = (index: number) => {
    state.currentIndex = index
  };

  const setCurrentPlaylist = (playlist: Track[]) => {
    state.currentPlaylist = playlist;
    state.currentIndex = 0;
    state.currentTrack = playlist[0] || null;
  };

  const playTrack = () => {
    state.isPlaying = true;
  };

  const pauseTrack = () => {
    state.isPlaying = false;
  };

  return {
    // Getters
    chartTracks,
    favoriteTracks,
    isLoading,
    hasError,
    currentTrack,
    currentPlaylist,
    currentIndex,
    isPlaying,
    // Actions
    getChartTracks,
    setCurrentTrack,
    setCurrentPlaylist,
    playTrack,
    pauseTrack,
    setCurrentIndex,
  };
});
