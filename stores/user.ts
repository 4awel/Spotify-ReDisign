import type { UserState, LikedTrack } from "~/types/user";
import axios from "axios";
export const useUserStore = defineStore("user", () => {
  const state = reactive<UserState>({
    id: "",
    email: "",
    username: "",
    error: null,
    likedTracks: [],
    isLoading: false,
    isAlertUved: false,
    settings: {
      theme: 'dark'
    }
  });

  // Getters
  const getEmail = computed(() => state.email);
  const getUsername = computed(() => state.username);
  const getError = computed(() => state.error);
  const getLikedTracks = computed(() => state.likedTracks);
  const getId = computed(() => state.id);
  const isAuthenticated = computed(() => !!state.id);
  const isAlertUved = computed(() => state.isAlertUved);
  const getSettings = computed(() => state.settings)

  // Actions
  const setUser = (userData: Partial<UserState>) => {
    if (userData.id) state.id = userData.id;
    if (userData.email) state.email = userData.email;
    if (userData.username) state.username = userData.username;
    state.error = null;
  };

  const toggleUvedOpen = () => {
    state.isAlertUved = !state.isAlertUved
  }

  const clearUser = () => {
    state.id = "";
    state.email = "";
    state.username = "";
    state.error = null;
    state.likedTracks = [];
  };

  const setError = (error: string | null) => {
    state.error = error;
  };

  const addLikedTrack = (track: LikedTrack) => {
    state.likedTracks.push(track);
  };

  const removeLikedTrack = (trackId: string) => {
    state.likedTracks = state.likedTracks.filter(track => track.trackId !== trackId);
  };

  return {
    // State (для дебага или прямого доступа)
    state: readonly(state),
    
    // Getters
    getEmail,
    getUsername,
    getError,
    getLikedTracks,
    getId,
    isAuthenticated,
    isAlertUved,
    getSettings,
    // Actions
    setUser,
    clearUser,
    setError,
    addLikedTrack,
    removeLikedTrack,
    toggleUvedOpen,
  };
});