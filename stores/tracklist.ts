import type { Track, Artist, Album } from "~/types";

interface TrackListState {
  chartTracks: Track[];
  favoriteTracks: Track[];
  loading: boolean;
  error: string | null;
  currentTrack: Track | null;
  currentPlaylist: Track[];
  isPlaying: boolean;
  currentIndex: number;
  isLiked: boolean;
  isLoading: boolean;
  currentOfset: number;
}

import axios from "axios";
import { useUserStore } from "~/stores/user";

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
    isLiked: false,
    isLoading: false,
    currentOfset: 0,
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
  const currentOfset = computed(() => state.currentOfset);

  // Actions
  const getChartTracks = async (id: string) => {
    state.loading = true;
    state.error = null;
    try {
      console.log(id);
      const response = await axios(`http://localhost:4000/deezer/api`, {
        params: { userId: id },
      });
      console.log(response.data);
      state.chartTracks = response.data;
      state.currentTrack = response.data[state.currentIndex];
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

  const getLikedPlayList = async () => {
    state.isLoading = true;
    const userStore = useUserStore();
    const userId: string = userStore.getId;
    console.log("Action!")
    try {
      const response = await axios("http://localhost:4000/liked/tracklist", {
        params: {
          id: userId,
          limit: 20,
          ofset: state.currentOfset,
        },
      });

      state.favoriteTracks = [...state.favoriteTracks, ...response.data];
      state.currentOfset++;
      console.log(state.favoriteTracks);
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
      console.log(error);
    } finally {
      state.isLoading = false;
    }
  };

  const postLikedTrack = async (trackId: number) => {
    state.error = null;
    const userStore = useUserStore();
    const userId: string = userStore.getId;

    try {
      if (!trackId) return (state.error = "Track ID Undefined");
      const response = await axios.put(
        "http://localhost:4000/track/liked",
        null,
        {
          params: {
            trackId,
            userId,
          },
        }
      );
      console.log(response.data.isLiked);
      if (state.currentTrack)
        state.currentTrack.isLiked = response.data.isLiked;
      await getChartTracks(userStore.getId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
      console.log(error);
    }
  };

  const setCurrentTrack = (track: Track, index: number = 0) => {
    state.currentTrack = { ...track };
    state.currentIndex = index;
    state.isPlaying = true;
  };

  const setCurrentIndex = (index: number) => {
    state.currentIndex = index;
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

  const clearFavoriteTracks = () => {
    state.favoriteTracks = [];
    state.currentOfset = 0;
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
    isLiked,
    currentOfset,
    // Actions
    getChartTracks,
    getLikedPlayList,
    setCurrentTrack,
    setCurrentPlaylist,
    playTrack,
    pauseTrack,
    setCurrentIndex,
    postLikedTrack,
    clearFavoriteTracks,
  };
});
