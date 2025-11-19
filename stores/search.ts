import axios from "axios";
import type { Album, Artist, Track } from "~/types";

interface ResponseSearchType {
  artist: Artist;
  tracklist: Track[];
}

interface SearchState {
  searchModalValue: string;
  loading: boolean;
  error: string | null;
  resultSearch: ResponseSearchType[];
  resultPlayListArtist: Track[]
}

export const useSearchStore = defineStore("search", () => {
  // State
  const state = reactive<SearchState>({
    searchModalValue: "",
    loading: false,
    error: null,
    resultSearch: [],
    resultPlayListArtist: [],
  });

  // Getter

  const isLoading = computed(() => state.loading);
  const hasError = computed(() => state.error);
  const searchResult = computed(() => state.resultSearch);
  const searchValue = computed(() => state.searchModalValue);
  const resultPlayListArtist = computed(() => state.resultPlayListArtist);

  // Action
  const search = (value: string) => {
    state.searchModalValue = value;
  };

  const searchOnAPI = async () => {
    state.loading = true;
    state.error = null;
    try {
      const response = await axios("http://localhost:4000/deezer/search", {
        params: {
          value: state.searchModalValue,
        },
      });
      if (!response.data.message) {
        state.resultSearch = response.data;
      } else {
        state.error = response.data.message;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
    } finally {
      state.loading = false;
    }
  };

  const getPlayListArtists = async (id: number) => {
    state.error = null;
    try {
      const response = await axios("http://localhost:4000/artist/playlist", {
        params: {
          id: id,
        },
      });
      if (!response.data.message) {
        state.resultPlayListArtist = response.data;
      } else {
        state.error = response.data.message;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = "Unknown error";
      }
    }
  };

  return {
    isLoading,
    hasError,
    search,
    searchOnAPI,
    searchResult,
    searchValue,
    getPlayListArtists,
    resultPlayListArtist
  };
});
