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
      theme: "dark",
    },
  });

  // Getters
  const getEmail = computed(() => state.email);
  const getUsername = computed(() => state.username);
  const getError = computed(() => state.error);
  const getLikedTracks = computed(() => state.likedTracks);
  const getId = computed(() => state.id);
  const isAuthenticated = computed(() => !!state.id);
  const isAlertUved = computed(() => state.isAlertUved);
  const getSettings = computed(() => state.settings);

  // Actions
  const setUser = (userData: Partial<UserState>) => {
    if (userData.id) state.id = userData.id;
    if (userData.email) state.email = userData.email;
    if (userData.username) state.username = userData.username;
    state.error = null;
  };

  const toggleUvedOpen = () => {
    state.isAlertUved = !state.isAlertUved;
  };

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
    state.likedTracks = state.likedTracks.filter(
      (track) => track.trackId !== trackId,
    );
  };

  // ДОБАВИТЬ ЭТОТ МЕТОД - обновление настроек
  const updateSettings = (
    newSettings: Partial<{ theme: "light" | "dark" }>,
  ) => {
    state.settings = {
      ...state.settings,
      ...newSettings,
    };

    // Сохраняем настройки в localStorage
    localStorage.setItem("userSettings", JSON.stringify(state.settings));

    // Применяем тему к документу
    if (newSettings.theme) {
      if (newSettings.theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Загрузка настроек из localStorage при инициализации
  const loadSettingsFromStorage = () => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        state.settings = { ...state.settings, ...parsed };

        // Применяем сохраненную тему
        if (parsed.theme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        } else if (parsed.theme === "light") {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error loading settings from localStorage:", error);
      }
    }
  };

  // Загружаем настройки при создании store
  if (typeof window !== "undefined") {
    loadSettingsFromStorage();
  }

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
    updateSettings, // ДОБАВЛЕНО
    loadSettingsFromStorage, // ДОБАВЛЕНО
  };
});
