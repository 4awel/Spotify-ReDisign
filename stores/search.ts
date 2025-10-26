import axios from "axios";
import type { Album, Artist, Track } from "~/types";

interface SearchState {
    searchModalValue: string,
    loading: boolean,
    error: string | null,
    resultSearch: Track[] | Artist[] | Album[]
}

export const useSearchStore = defineStore('search', () => {

    // State
    const state = reactive<SearchState>({
        searchModalValue: '',
        loading: false,
        error: null,
        resultSearch: []
    });

    // Getter

    const isLoading = computed(() => state.loading);
    const hasError = computed(() => state.error);
    const searchResult = computed(() => state.resultSearch);
    const searchValue = computed(() => state.searchModalValue);

    // Action
    const search = (value: string) => {
        state.searchModalValue = value;
    }

    const searchOnAPI = async () => {
      state.loading = true;
      state.error = null;
      try {
        const response = await axios('http://localhost:4000/deezer/search', {
            params: {
                value: state.searchModalValue
            }
        });
        state.resultSearch = response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
            state.error = error.message
        } else {
            state.error = 'Unknown error'
        }
      } finally {
        state.loading = false;
      }
    }


    return {
        isLoading,
        hasError,
        search,
        searchOnAPI,
        searchResult,
        searchValue,
    }
})