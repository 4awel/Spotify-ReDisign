<template>
  <div class="search-container">
    <h1 style="font-size: 50px; margin: 0;">Search: {{ searchStore.searchValue }}</h1>
    <div v-if="searchStore.isLoading" class="loading">Loading...</div>
    <div v-if="searchStore.searchResult.length === 0" class="searching">
      <b>Что сегодня найдем?</b>
    </div>
    <div
      v-if="searchStore.searchResult.length === 0"
      class="error-search-result"
    >
      <b>По запросу: {{ searchStore.searchValue }} ничего не найден</b>
    </div>
    <div v-if="searchStore.searchResult.length !== 0" class="search-result">
      <div class="artist">
        <div class="artist-avatar-container">
          <img
            class="avatar"
            :src="searchStore.searchResult.artist.picture"
            alt="artist"
          />
          <!-- Overlay с кнопками при наведении -->
          <div class="avatar-overlay">
            <button class="overlay-btn pin-btn" @click="togglePinArtist">
              <img :src="isArtistPinned ? pinFilled : pinOutline" alt="pin" />
            </button>
            <button v-if="!isPlay" class="overlay-btn play-btn" @click="playArtist">
              <img src="../assets/svg/search/play.svg" alt="play" />
            </button>
            <button v-else class="overlay-btn play-btn" @click="playArtist">
              <img src="../assets/svg/search/stop.svg" alt="stop" />
            </button>
            <button class="overlay-btn like-btn" @click="toggleLikeArtist">
              <img :src="isArtistLiked ? likeFull : likeLow" alt="like" />
            </button>
          </div>
        </div>
        <b>{{ searchStore.searchResult.artist.name }}</b>
      </div>
      <div class="tracklist">
        <div
          v-for="(track, index) in searchStore.searchResult.tracklist"
          :key="track.id"
          class="track"
        >
          <!-- Кнопка воспроизведения/паузы для каждого трека -->
          <div @click="togglePlay(index)" class="play-control">
            <img
              v-if="!track.isPlaying"
              src="../assets/svg/search/play.svg"
              alt="play"
            />
            <img v-else src="../assets/svg/search/stop.svg" alt="stop" />
          </div>

          <div class="track-preview">
            <img :src="track.coverUrl" alt="track-preview" />
          </div>

          <div class="title">
            <b>{{ track.title }}</b>
            <a href="">{{ track.artist }}</a>
          </div>

          <!-- Кнопка лайка для каждого трека -->
          <div @click="toggleLike(index)" class="like-control">
            <img
              v-if="track.isLiked"
              src="../assets/svg/record/like-full.svg"
              alt="like"
            />
            <img v-else src="../assets/svg/record/like-low.svg" alt="dislike" />
          </div>

          <div class="duration">
            <b>{{ track.duration }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="discover"></div>
    <div class="ganres"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useSearchStore } from "~/stores/search";
import { useTracklistStore } from "~/stores/tracklist";
import type { Track } from "~/types";

import pinFilled from '../assets/svg/search/pin-filled.svg';
import pinOutline from '../assets/svg/search/pin-outline.svg';
import likeFull from '../assets/svg/record/like-full.svg';
import likeLow from '../assets/svg/record/like-low.svg';

const searchStore = useSearchStore();
const trackListStore = useTracklistStore();

// Состояния для артиста
const isArtistPinned = ref(false);
const isArtistLiked = ref(false);
const isPlay = ref(false);

// Инициализация состояний для треков
const initializeTrackStates = () => {
  if (searchStore.searchResult.tracklist) {
    searchStore.searchResult.tracklist.forEach((track: any) => {
      // Добавляем свойства isLiked и isPlaying к каждому треку
      if (track.isLiked === undefined) {
        track.isLiked = false;
      }
      if (track.isPlaying === undefined) {
        track.isPlaying = false;
      }
    });
  }
};

// Воспроизведение артиста
const playArtist = () => {
  isPlay.value = !isPlay.value;
  console.log("Playing artist:", searchStore.searchResult.artist.name);
  // Логика воспроизведения всех треков артиста
};

// Закрепление артиста
const togglePinArtist = () => {
  isArtistPinned.value = !isArtistPinned.value;
  console.log("Artist pinned:", isArtistPinned.value);
};

// Лайк артиста
const toggleLikeArtist = () => {
  isArtistLiked.value = !isArtistLiked.value;
  console.log("Artist liked:", isArtistLiked.value);
};

// Переключение воспроизведения для конкретного трека
const togglePlay = (index: number) => {
  const track = searchStore.searchResult.tracklist[index];
  trackListStore.getTrackOut(searchStore.searchResult.tracklist);

  // Останавливаем все другие треки
  searchStore.searchResult.tracklist.forEach((t: any, i: number) => {
    if (i !== index) {
      t.isPlaying = false;
    }
  });

  // Переключаем состояние текущего трека
  track.isPlaying = !track.isPlaying;

  console.log(
    `Track ${track.title} is now ${track.isPlaying ? "playing" : "paused"}`
  );
};

// Переключение лайка для конкретного трека
const toggleLike = (index: number) => {
  const track = searchStore.searchResult.tracklist[index];
  track.isLiked = !track.isLiked;

  console.log(
    `Track ${track.title} is now ${track.isLiked ? "liked" : "unliked"}`
  );
};

// Инициализируем состояния при монтировании компонента
onMounted(() => {
  initializeTrackStates();
});

// Следим за изменениями searchResult
watch(
  () => searchStore.searchResult,
  () => {
    initializeTrackStates();
  },
  { deep: true }
);
</script>

<style scoped>
.search-container {
  padding: 20px 40px;
}

.track {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-radius: 20px;
  width: 60%;
  gap: 15px;
  transition: background-color 0.3s ease;
}

.track:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tracklist {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.artist {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.artist-avatar-container {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 300ms ease;
}

.artist .avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  transition: all 300ms ease;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  opacity: 0;
  transition: all 300ms ease;
  border-radius: 50%;
}

.artist-avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.artist-avatar-container:hover .avatar {
  filter: blur(2px);
  transform: scale(1.05);
}

.overlay-btn {
  /* background: rgba(255, 255, 255, 0.9); */
  border: none;
  /* border-radius: 50%; */
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); */
}

.overlay-btn:hover {
  /* background: white; */
  transform: scale(1.1);
  /* box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4); */
}

.overlay-btn img {
  width: 42px;
  height: 42px;
}

.play-btn {
  background: #00000000;
}

.play-btn:hover {
  background: #00000000;
}

.pin-btn,
.like-btn {
  background: rgba(255, 255, 255, 0);
}

.pin-btn img {
  width: 24px;
  height: 24px;
}

.artist b {
  font-size: 42px;
  color: white;
}

.play-control,
.like-control {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-control:hover,
.like-control:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.play-control img {
  width: 24px;
  height: 24px;
}

.like-control img {
  width: 40px;
  height: 40px;
}

.track-preview img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.title {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title b {
  color: white;
  font-size: 16px;
}

.title a {
  color: #b3b3b3;
  font-size: 14px;
  text-decoration: none;
}

.title a:hover {
  text-decoration: underline;
}

.duration {
  color: #b3b3b3;
  font-size: 14px;
  width: 20px;
}

.loading {
  color: #1db954;
  font-size: 18px;
  text-align: center;
  padding: 20px;
}

.searching {
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
}

.error-search-result {
  color: #ff6b6b;
  font-size: 18px;
  text-align: center;
  padding: 40px;
}
</style>
