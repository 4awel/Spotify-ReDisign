export interface LikedTrack {
  trackId?: string;
  addedAt?: Date | null;
}

export type SettingsUser = {
  theme: 'dark' | 'light',
}

export interface UserState {
  id: string;
  email: string;
  username: string;
  error?: string | null;
  likedTracks: LikedTrack[];
  isLoading: boolean,
  isAlertUved: boolean,
  settings: SettingsUser
}