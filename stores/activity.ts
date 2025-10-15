// stores/auth.ts

interface User {
  id: string,
  username: string,
  stateVisit: string,
  avatar?: string
};

interface Track {
  id: string,
  title: string,
  artist: string,
  album: string,
  coverUrl: string,
};

interface FriendsActivity {
  user: User | null,
  isOnline: boolean,
  currentTrack: Track,
  lastSeen?: Date,
  lastTrack?: Track
};

interface ActivityState {
  friends: FriendsActivity[],
  isActivityOpen: boolean,
  loading: boolean,
  error: string | null,
}

export const useActivityStore = defineStore('activity', () => {
  // State
  const state = reactive<ActivityState>({
    friends: [],
    isActivityOpen: false,
    loading: false,
    error: null
  })

  // Getters
  const toggleFriendsActivityOpen = computed(() => {
    state.isActivityOpen = !state.isActivityOpen;
  });

  // Actions
  const login = async (email: string, password: string) => {

  }

  return {
    // State
    isActivityOpen: computed(() => state.isActivityOpen),

    // Getters
    toggleFriendsActivityOpen
    
    // Actions

  }
})