<template>
  <div class="search-container">
    <h1 style="font-size: 50px; margin: 0">
      Search: {{ searchStore.searchValue }}
    </h1>
    <div v-if="searchStore.isLoading" class="loading">
      <img
        class="loading-search"
        src="../assets//svg/header/header-2.svg"
        alt="searching"
      />
      <span class="text-searching">Ща найдем</span>
    </div>
    <div v-if="searchStore.hasError" class="error-search-result">
      <b
        >Request: {{ searchStore.searchValue }} throw error:
        {{ searchStore.hasError }}</b
      >
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
            <button
              v-if="!isPlay"
              class="overlay-btn play-btn"
              @click="playArtist"
            >
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
          @click="bannerTrack.setCurrentTrack(track, index)"
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
            <NuxtLink to="/artists/" :artist="track">{{ track.artist }}</NuxtLink>
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
            <b>{{ formatDuration(track.duration) }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="discover"></div>
    <div class="ganres"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useSearchStore } from "~/stores/search";
import { useTracklistStore } from "~/stores/tracklist";
import { useBannerTrack } from "~/stores/bannertrack";
import type { Track } from "~/types";

import pinFilled from "../assets/svg/search/pin-filled.svg";
import pinOutline from "../assets/svg/search/pin-outline.svg";
import likeFull from "../assets/svg/record/like-full.svg";
import likeLow from "../assets/svg/record/like-low.svg";

const searchStore = useSearchStore();
const trackListStore = useTracklistStore();
const bannerTrack = useBannerTrack();

// Состояния для артиста
const isArtistPinned = ref(false);
const isArtistLiked = ref(false);
const isPlay = ref(false);


// Функция для форматирования времени
const formatDuration = (duration: number | string): string => {
  try {
    // Если duration уже в формате "mm:ss", возвращаем как есть
    if (typeof duration === "string" && duration.includes(":")) {
      return duration;
    }

    // Если duration в секундах (число)
    let seconds: number;

    if (typeof duration === "string") {
      // Пробуем преобразовать строку в число
      seconds = parseInt(duration);
      if (isNaN(seconds)) {
        return "0:00";
      }
    } else {
      seconds = duration;
    }

    // Форматируем в mm:ss
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  } catch (error) {
    console.error("Error formatting duration:", error);
    return "0:00";
  }
};

// Альтернативная версия для обработки разных форматов
const formatDurationAdvanced = (duration: any): string => {
  if (!duration) return "0:00";

  // Если duration уже отформатирован
  if (typeof duration === "string") {
    // Проверяем форматы: "mm:ss", "m:ss", "m:s"
    const timeFormat = /^(\d+):(\d{1,2})$/;
    const match = duration.match(timeFormat);

    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    // Если это просто число в строке
    const seconds = parseInt(duration);
    if (!isNaN(seconds)) {
      return formatDuration(seconds);
    }

    return "0:00";
  }

  // Если duration в секундах (число)
  if (typeof duration === "number") {
    return formatDuration(duration);
  }

  return "0:00";
};

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

      // Форматируем duration если нужно
      if (track.duration && typeof track.duration !== "string") {
        // Если duration не строка, форматируем его
        track.formattedDuration = formatDuration(track.duration);
      } else if (track.duration) {
        // Если duration строка, проверяем формат
        track.formattedDuration = formatDurationAdvanced(track.duration);
      } else {
        track.formattedDuration = "0:00";
      }
    });
  }
  if (searchStore.resultPlayListArtist) {
    searchStore.resultPlayListArtist.forEach((track: any) => {
      // Добавляем свойства isLiked и isPlaying к каждому треку
      if (track.isPlaying === undefined) {
        track.isPlaying = false;
      }
    });
  }
};

// Воспроизведение артиста
const playArtist = () => {
  isPlay.value = !isPlay.value;
  const id = searchStore.searchResult.artist.id;
  searchStore.getPlayListArtists(id);

  const track: any = searchStore.resultPlayListArtist[trackListStore.currentIndex];
  const tracklist = searchStore.resultPlayListArtist;
  // Если нажимаем на уже играющий трек - ставим на паузу
  if (isPlay.value) {
    track.isPlaying = true;
  } else {
    track.isPlaying = false;
  }
  if ((track as any).isPlaying) {
    (track as any).isPlaying = false;
    trackListStore.pauseTrack();
    console.log(`Track ${(track as any).title} paused`);
    return;
  }
  trackListStore.setCurrentPlaylist(tracklist);
  trackListStore.setCurrentTrack(track, 0);
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
  const playlist = searchStore.searchResult.tracklist;

  // Если нажимаем на уже играющий трек - ставим на паузу
  if (track.isPlaying) {
    track.isPlaying = false;
    trackListStore.pauseTrack();
    console.log(`Track ${track.title} paused`);
    return;
  }

  // Останавливаем все другие треки и сбрасываем их состояние
  searchStore.searchResult.tracklist.forEach((t: any, i: number) => {
    if (i !== index) {
      t.isPlaying = false;
    }
  });

  // Устанавливаем весь плейлист и текущий трек
  trackListStore.setCurrentPlaylist(playlist);
  trackListStore.setCurrentTrack(track, index);
  trackListStore.playTrack();

  // Включаем воспроизведение текущего трека
  track.isPlaying = true;

  console.log(`Track ${track.title} is now playing`);
};

// Переключение лайка для конкретного трека
const toggleLike = (index: number) => {
  const track = searchStore.searchResult.tracklist[index];
  track.isLiked = !track.isLiked;

  console.log(
    `Track ${track.title} is now ${track.isLiked ? "liked" : "unliked"}`
  );
};

// Computed свойства для отслеживания состояния из Store
const currentIndexFromStore = computed(() => trackListStore.currentIndex);
const isPlayingFromStore = computed(() => trackListStore.isPlaying);
const currentTrackFromStore = computed(() => trackListStore.currentTrack);

// Watcher для синхронизации состояний при переключении треков извне
watch(currentIndexFromStore, (newIndex, oldIndex) => {
  // Сбрасываем состояние у предыдущего трека
  if (oldIndex !== null && searchStore.searchResult.tracklist[oldIndex]) {
    searchStore.searchResult.tracklist[oldIndex].isPlaying = false;
  }

  // Устанавливаем состояние у нового текущего трека
  if (newIndex !== null && searchStore.searchResult.tracklist[newIndex]) {
    searchStore.searchResult.tracklist[newIndex].isPlaying =
      isPlayingFromStore.value;
  }
});

// Watcher для синхронизации состояния воспроизведения
watch(isPlayingFromStore, (isPlaying) => {
  const currentIndex = currentIndexFromStore.value;

  if (
    currentIndex !== null &&
    searchStore.searchResult.tracklist[currentIndex]
  ) {
    searchStore.searchResult.tracklist[currentIndex].isPlaying = isPlaying;
  }
});

// Watcher для сброса всех состояний при смене трека
watch(currentTrackFromStore, (newTrack, oldTrack) => {
  // Если трек сменился, сбрасываем состояние у всех треков кроме текущего
  if (newTrack && oldTrack && newTrack.id !== oldTrack.id) {
    const currentIndex = currentIndexFromStore.value;
    searchStore.searchResult.tracklist.forEach((track: any, index: number) => {
      track.isPlaying = index === currentIndex && isPlayingFromStore.value;
    });
  }
});

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

<style scoped lang="scss">
@import "./styles/search.scss";
</style>
