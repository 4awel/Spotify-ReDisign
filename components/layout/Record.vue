<template>
  <div class="record-container">
    <!-- Аудио элемент с ref для доступа -->
    <audio
      v-if="currentTrack.previewUrl"
      ref="audioPlayer"
      @timeupdate="updateProgress"
      @ended="handleTrackEnd"
      :src="currentTrack.previewUrl"
    ></audio>
    <div class="record-play-menu">
      <div class="action-group">
        <div v-if="!isPlaying" @click="playTrack" class="svg-paly svg-record">
          <img src="@/assets/svg/record/play.svg" alt="play" />
        </div>
        <div v-else @click="pauseTrack" class="svg-stop svg-record">
          <img src="@/assets/svg/record/stop.svg" alt="stop" />
        </div>
        <div class="svg-prev svg" @click="prevTrack">
          <img src="@/assets/svg/record/prev.svg" alt="prev" />
        </div>
        <div class="svg-next svg" @click="nextTrack">
          <img src="@/assets/svg/record/next.svg" alt="next" />
        </div>
        <div
          class="svg-random svg"
          :class="{ active: isActiveRandom }"
          @click="isActiveRandom = !isActiveRandom"
        >
          <img src="@/assets/svg/record/random.svg" alt="random" />
        </div>
        <div
          class="svg-repeat svg"
          :class="{ active: isActiveRepeat }"
          @click="isActiveRepeat = !isActiveRepeat"
        >
          <img src="@/assets/svg/record/repeat.svg" alt="repeat" />
        </div>
        <div class="record-play">
          <span class="time-current">{{ formatTime(currentTime) }}</span>
          <div class="progress-container">
            <input
              type="range"
              name="record-play"
              id="record-play"
              class="progress-bar"
              min="0"
              :max="duration"
              :value="currentTime"
              @input="seekTrack"
            />
          </div>
          <span class="time-all">{{ formatTime(duration) }}</span>
        </div>
        <div class="svg-sound svg" @click="toggleVolumeMenu">
          <img src="@/assets/svg/record/sound.svg" alt="sound" />
          <div v-if="showVolumeMenu" class="volume-menu">
            <input
              type="range"
              class="volume-slider"
              min="0"
              max="1"
              step="0.01"
              :value="volume"
              @input="setVolume"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="current-track">
      <div class="cover-track">
        <img :src="currentTrack.coverUrl" alt="cover" />
      </div>
      <div class="description-track">
        <h4 class="title">{{ currentTrack.title }}</h4>
        <span class="executor">{{ currentTrack.artist }}</span>
        <span class="album-executors">{{ currentTrack.album }}</span>
      </div>
    </div>
    <div class="record-settings">
      <div class="group-btn">
        <div v-if="!isLike" @click="toggleLike" class="svg-like-low svg">
          <img src="@/assets/svg/record/like-low.svg" alt="like-low" />
        </div>
        <div v-else @click="toggleLike" class="svg-like-full svg">
          <img src="@/assets/svg/record/like-full.svg" alt="like-full" />
        </div>
        <div class="svg-addplaylist svg">
          <img src="@/assets/svg/record/addplaylist.svg" alt="addplaylist" />
        </div>
        <div class="svg-lirics svg">
          <img src="@/assets/svg/record/lirics.svg" alt="lirics" />
        </div>
        <div class="svg-devices svg">
          <img src="@/assets/svg/record/devices.svg" alt="devices" />
        </div>
        <div class="svg-menu svg">
          <img src="@/assets/svg/record/menu.svg" alt="menu" />
        </div>
      </div>
      <hr class="vertical-hr" />
      <div class="group-queue">
        <div class="svg-dj svg">
          <img src="@/assets/svg/record/dj.svg" alt="dj" />
        </div>
        <div class="svg-queue svg">
          <img src="@/assets/svg/record/queue.svg" alt="queue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import { useTracklistStore } from "~/stores/tracklist";
import type { Track } from "~/types";

export default defineComponent({
  setup() {
    const TrackListStore = useTracklistStore();

    // Record state
    const audioPlayer = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);
    const isLike = ref(false);
    const isActiveRepeat = ref(false);
    const isActiveRandom = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const currentIndexTrack = ref(0);
    const shuffleTrackList = ref([] as Track[]);
    const currentTrack = ref(<Track>{
      id: 0,
      title: "",
      artist: "",
      album: "",
      duration: 0,
      coverUrl: "",
      previewUrl: "",
      artistId: 0,
      albumId: 0,
      isExplicit: false,
      rank: 0,
    });

    const historyTrackList = ref([] as Track[]);

    // Volume state
    const isMuted = ref(false);
    const volume = ref(0.7);
    const showVolumeMenu = ref(false);

    const toggleVolumeMenu = () => {
      showVolumeMenu.value = !showVolumeMenu.value;
    };

    const setVolume = (event: Event) => {
      const target = event.target as HTMLInputElement;
      volume.value = parseFloat(target.value);
      if (audioPlayer.value) {
        audioPlayer.value.volume = volume.value;
      }
    };

    // Воспроизведение трека
    const playTrack = async () => {
      if (audioPlayer.value) {
        try {
          await audioPlayer.value.play();
          isPlaying.value = true;
        } catch (error) {
          console.error("Ошибка воспроизведения:", error);
        }
      }
    };

    // Пауза трека
    const pauseTrack = () => {
      if (audioPlayer.value) {
        audioPlayer.value.pause();
        isPlaying.value = false;
      }
    };

    // Перемотка трека
    const seekTrack = (event: Event) => {
      if (audioPlayer.value) {
        const target = event.target as HTMLInputElement;
        const seekTime = parseFloat(target.value);
        audioPlayer.value.currentTime = seekTime;
        currentTime.value = seekTime;
      }
    };

    // Обновление прогресса воспроизведения
    const updateProgress = () => {
      if (audioPlayer.value) {
        currentTime.value = audioPlayer.value.currentTime;
        if (!duration.value) {
          duration.value = audioPlayer.value.duration || 0;
        }
      }
    };

    // Обработка окончания трека
    const handleTrackEnd = () => {
      isPlaying.value = false;
      currentTime.value = 0;

      if (isActiveRepeat.value) {
        // Если включен повтор, воспроизводим заново
        playTrack();
      }

      const chartTracksList = shuffleTrackList.value;
      historyTrackList.value.push(currentIndexTrack.value);
      currentIndexTrack.value++;
      currentTrack.value = chartTracksList[currentIndexTrack.value];
      setTimeout(() => {
        playTrack();
      }, 200);
    };

    // Переключение звука
    const toggleMute = () => {
      if (audioPlayer.value) {
        audioPlayer.value.muted = !audioPlayer.value.muted;
        isMuted.value = audioPlayer.value.muted;
      }
    };

    // Форматирование времени в мм:сс
    const formatTime = (seconds: number) => {
      if (!seconds || isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Треки в рендере

    const shuffleArray = () => {
      const shuffleTrackArray = [...TrackListStore.chartTracks] as Track[];
      for (let i = shuffleTrackArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleTrackArray[i], shuffleTrackArray[j]] = [
          shuffleTrackArray[j],
          shuffleTrackArray[i],
        ];
      }
      shuffleTrackList.value = shuffleTrackArray;
    };

    const generateRandomTrack = () => {
      try {
        const chartTracksList = shuffleTrackList.value;

        if (chartTracksList.length === 0 || !chartTracksList) {
          return;
        }
        currentTrack.value = chartTracksList[currentIndexTrack.value];
      } catch (err) {
        console.log("Error generate random track", err);
      }
    };

    const nextTrack = () => {
      pauseTrack();
      currentTime.value = 0;
      const chartTracksList = shuffleTrackList.value;
      historyTrackList.value.push(currentIndexTrack.value);
      currentIndexTrack.value++;
      currentTrack.value = chartTracksList[currentIndexTrack.value];
      setTimeout(() => {
        playTrack();
      }, 200);
    };

    const prevTrack = () => {
      pauseTrack();
      currentTime.value = 0;
      const chartTracksList = shuffleTrackList.value;
      currentIndexTrack.value--;
      currentTrack.value = chartTracksList[currentIndexTrack.value];
      setTimeout(() => {
        playTrack();
      }, 200);
    };

    const toggleLike = () => {
      isLike.value = !isLike.value;
    };

    // Инициализация при монтировании компонента
    onMounted(async () => {
      try {
        await TrackListStore.getChartTracks();

        if (audioPlayer.value) {
          audioPlayer.value.addEventListener("loadedmetadata", () => {
            duration.value = audioPlayer.value?.duration || 0;
          });
        }

        if (audioPlayer.value) {
          audioPlayer.value.volume = volume.value;
        }
        shuffleArray();
        generateRandomTrack();
      } catch (err) {
        console.log("Error loading track", err);
      }
    });

    return {
      audioPlayer,
      isPlaying,
      isLike,
      isActiveRepeat,
      isActiveRandom,
      isMuted,
      currentTime,
      duration,
      playTrack,
      pauseTrack,
      seekTrack,
      updateProgress,
      handleTrackEnd,
      toggleMute,
      formatTime,
      nextTrack,
      prevTrack,
      toggleLike,
      toggleVolumeMenu,
      volume,
      showVolumeMenu,
      setVolume,
      currentTrack,
      currentIndexTrack,
      historyTrackList,
      shuffleTrackList
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../layout/styles/Record.scss";

// Дополнительные стили для аудио плеера
.volume-menu {
  position: absolute;
  display: flex;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #282828;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 8px;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #282828;
  }
}

.volume-slider {
  width: 80px;
  height: 4px;
  border-radius: 2px;
  accent-color: #1ed760;
  outline: none;
  cursor: pointer;
}

// Скрываем стандартный аудио элемент
audio {
  display: none;
}

// Анимация для активного воспроизведения
.svg-record {
  position: relative;

  &.playing::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid #1ed760;
    animation: pulse 1.5s ease-in-out infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
