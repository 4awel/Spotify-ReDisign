// types/index.ts
export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  previewUrl: string;
  artistId: number;
  albumId: number;
  isExplicit: boolean;
  rank?: number;
}

export interface Artist {
  id: number;
  name: string;
  picture: string;
  tracklist: string;
}

export interface Album {
  id: number;
  title: string;
  coverUrl: string;
  artist: string;
  tracklist: string;
}

// Дополнительные типы для твоего проекта
export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  preferences: UserPreferences
  createdAt: Date
}

export interface UserPreferences {
  theme: 'dark' | 'light'
  audioQuality: 'low' | 'medium' | 'high'
  autoplay: boolean
  crossfade: number
}

export interface Playlist {
  id: string
  name: string
  description?: string
  coverUrl?: string
  tracks: Track[]
  userId: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}