import type { Track, Artist, Album } from "~/types";
import axios from "axios";
import { useUserStore } from "~/stores/user";

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

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Create axios instance with base URL
  const api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 10000,
  });

  // Request interceptor to add token to all requests
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(
        `${config.method?.toUpperCase()} ${config.url}`,
        config.params || config.data,
      );
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Authentication failed, redirecting to login...");
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    },
  );

  // Actions
  const getChartTracks = async (id: string) => {
    state.loading = true;
    state.error = null;
    try {
      console.log("Fetching chart tracks for user:", id);
      const response = await api.get("/deezer/api", {
        params: { userId: id },
      });
      console.log("Chart tracks received:", response.data);
      state.chartTracks = response.data;
      state.currentTrack = response.data[state.currentIndex];
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
      console.log("Error fetching chart tracks:", error);
    } finally {
      state.loading = false;
    }
  };

  const getLikedPlayList = async () => {
    state.isLoading = true;
    const userStore = useUserStore();
    const userId: string = userStore.getId;
    console.log("Fetching liked playlist for user:", userId);

    try {
      const response = await api.get("/deezer/liked/tracklist", {
        params: {
          id: userId,
          limit: 20,
          ofset: state.currentOfset,
        },
      });

      state.favoriteTracks = [...state.favoriteTracks, ...response.data];
      state.currentOfset++;
      console.log("Liked tracks received:", state.favoriteTracks.length);
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
      console.log("Error fetching liked playlist:", error);
    } finally {
      state.isLoading = false;
    }
  };

  const postLikedTrack = async (trackId: number) => {
    state.error = null;
    const userStore = useUserStore();

    if (!trackId) {
      state.error = "Track ID Undefined";
      return;
    }

    try {
      console.log("Posting like for track:", trackId);

      const response = await api.put("/track/liked", null, {
        params: { trackId },
      });
      if (state.currentTrack?.id === trackId) {
        state.currentTrack.isLiked = response.data.isLiked;
      }
      const chartTrackIndex = state.chartTracks.findIndex(
        (t) => t.id === trackId,
      );
      if (chartTrackIndex !== -1) {
        const track = state.chartTracks[chartTrackIndex];
        if (track) {
          track.isLiked = response.data.isLiked;
        }
      }
      if (response.data.isLiked) {
        const likedTrack = state.chartTracks.find((t) => t.id === trackId);
        if (likedTrack && !state.favoriteTracks.some((t) => t.id === trackId)) {
          state.favoriteTracks = [
            {
              ...likedTrack,
              isLiked: true,
              addedAt: new Date().toISOString(),
            },
            ...state.favoriteTracks,
          ];
        }
      } else {
        // Удаляем из избранного
        state.favoriteTracks = state.favoriteTracks.filter(
          (t) => t.id !== trackId,
        );
      }
    } catch (error: unknown) {
      console.error("Error posting like:", error);
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
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
