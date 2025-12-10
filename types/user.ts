export interface LikedTrack {
  trackId?: string;
  addedAt?: Date | null;
}

export interface UserState {
  id: string;
  email: string;
  username: string;
  error?: string | null;
  likedTracks: LikedTrack[];
  isLoading: boolean
}