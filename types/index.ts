// types/index.ts
export interface Track {
  // Базовые поля
  id: string
  title: string
  artist: string
  album: string
  duration: number // в секундах
  
  // URLs
  audioUrl: string
  coverUrl: string
  
  // Метаданные
  genre: string[]
  bpm?: number
  year?: number
  
  // Источник трека
  source: 'jamendo' | 'upload' | 'deezer' | 'spotify'
  sourceId?: string // ID из внешнего API
  license?: string
  
  // Статистика
  plays: number
  likes: number
  
  // Технические поля
  fileSize?: number
  bitrate?: number
  format?: string
  
  // Даты
  createdAt: Date
  updatedAt: Date
  
  // Для пользовательских треков
  userId?: string
  isPublic: boolean
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