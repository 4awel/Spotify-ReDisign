import type { UserState, LikedTrack } from "~/types/user";
import axios from "axios";
export const useUserStore = defineStore("user", () => {
  const state = reactive<UserState>({
    id: "",
    email: "",
    username: "",
    error: null,
    likedTracks: [],
    isLoading: false
  });


  console.log('1231231231231')
  // Getters
  const getEmail = computed(() => state.email);
  const getUsername = computed(() => state.username);
  const getError = computed(() => state.error);
  const getLikedTracks = computed(() => state.likedTracks);
  const getId = computed(() => state.id);
  const isAuthenticated = computed(() => !!state.id);
  const isLoading = computed(() => state.isLoading);

  // Actions
  const setUser = (userData: Partial<UserState>) => {
    if (userData.id) state.id = userData.id;
    if (userData.email) state.email = userData.email;
    if (userData.username) state.username = userData.username;
    state.error = null;
  };

  const getLikedPlayList = async () => {
    state.isLoading = true;
    state.error = null;
    try {
      const response = await axios('http://localhost:4000/liked/tracklist', {
        params: {
          id: state.id
        }
      });
      state.likedTracks = response.data;
      console.log(state.likedTracks)
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
    
    // Actions
    setUser,
    clearUser,
    setError,
    addLikedTrack,
    removeLikedTrack,
    getLikedPlayList,
  };
});