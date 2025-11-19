
import type { Track } from "~/types";

interface BannerTrackState {
    isOpenBanner: boolean;
    currentTrack: null | Track;
    currentIndex: number;
}

export const useBannerTrack = defineStore("bannertrack", () => {
    const state = reactive<BannerTrackState>({
        isOpenBanner: false,
        currentTrack: null,
        currentIndex: 0
    });

    // Getters
    const isOpenBanner = computed(() => state.isOpenBanner);
    const currentTrack = computed(() => state.currentTrack);
    const currentIndex = computed(() => state.currentIndex);

    // Action
    const setCurrentTrack = (track: Track, index: number) => {
        state.isOpenBanner = true;
        if (state.isOpenBanner) {
            state.currentTrack = track;
            state.currentIndex = index;
        } else {
            state.currentTrack = null;
            state.currentIndex = 0;
        }
    }

    const closeBanner = () => {
        state.isOpenBanner = false;
    }

    return {
        // Getters
        isOpenBanner,
        currentTrack,
        currentIndex,
        // Actions
        setCurrentTrack,
        closeBanner
    }

})