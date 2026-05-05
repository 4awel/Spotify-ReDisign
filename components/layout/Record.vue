<template>
  <div class="record-container" :class="settings.theme">
    <!-- Аудио элемент с ref для доступа -->
    <audio
      v-if="currentTrack?.previewUrl"
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
          @click="randomTrack"
        >
          <img src="@/assets/svg/record/random.svg" alt="random" />
        </div>
        <div
          class="svg-repeat svg"
          :class="{ active: isActiveRepeat }"
          @click="randomTrack"
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
        <img :src="currentTrack?.coverUrl" alt="cover" />
      </div>
      <div class="description-track">
        <h4 class="title">{{ currentTrack?.title }}</h4>
        <span class="executor">{{ currentTrack?.artist }}</span>
        <span class="album-executors">{{ currentTrack?.album }}</span>
      </div>
    </div>
    <div class="record-settings">
      <div class="group-btn">
        <div
          v-if="currentTrack"
          @click="toggleLike"
          class="svg-like svg"
          :class="{
            'svg-like-full': currentTrack.isLiked,
            'svg-like-low': !currentTrack.isLiked,
          }"
        >
          <img
            v-if="!currentTrack.isLiked"
            src="@/assets/svg/record/like-low.svg"
            alt="like-low"
          />
          <img v-else src="@/assets/svg/record/like-full.svg" alt="like-full" />
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
import { defineComponent, ref, onMounted, computed, watch } from "vue";

import { useTracklistStore } from "~/stores/tracklist";
import { useUserStore } from "~/stores/user";
import { Track } from "~/types/index";

export default defineComponent({
  setup() {
    const tracklistStore = useTracklistStore();
    const userStore = useUserStore();

    const settings = userStore.getSettings

    // Record state - используем только локальное состояние для UI
    const audioPlayer = ref<HTMLAudioElement | null>(null);
    const isActiveRepeat = ref(false);
    const isActiveRandom = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);

    // Volume state
    const isMuted = ref(false);
    const volume = ref(0.2);
    const showVolumeMenu = ref(false);

    // Computed свойства - берем данные из store
    const currentTrack = computed(() => tracklistStore.currentTrack);
    const isPlaying = computed(() => tracklistStore.isPlaying);
    const currentPlaylist = computed(() => tracklistStore.currentPlaylist);
    const currentIndex = computed(() => tracklistStore.currentIndex);
    const isLiked = computed(() => tracklistStore.isLiked);
    const chartTracks = computed(() => tracklistStore.chartTracks);

    // Локальное состояние для shuffle
    const shuffleTrackList = ref<Track[]>([]);
    const historyTrackList = ref<number[]>([]);

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
      if (audioPlayer.value && currentTrack.value) {
        try {
          await audioPlayer.value.play();
          tracklistStore.playTrack();
        } catch (error) {
          console.error("Ошибка воспроизведения:", error);
        }
      }
    };

    // Пауза трека
    const pauseTrack = () => {
      if (audioPlayer.value) {
        audioPlayer.value.pause();
        tracklistStore.pauseTrack();
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
      currentTime.value = 0;

      if (isActiveRepeat.value) {
        // Если включен повтор, воспроизводим заново
        playTrack();
      } else {
        nextTrack();
      }
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

    const shuffleArray = (array: Track[]): Track[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const randomTrack = () => {
      isActiveRandom.value = !isActiveRandom.value;
      if (isActiveRandom.value) {
        // При shuffle перемешиваем заново
        let nextIndex = currentIndex.value + 1;
        shuffleTrackList.value = shuffleArray(chartTracks.value);
        nextIndex = 0;
      }
    }


    const nextTrack = () => {
      pauseTrack();
      currentTime.value = 0;

      let tracks;
      if (shuffleTrackList.value.length > 0) {
        tracks = shuffleTrackList.value;
      } else if (currentPlaylist.value.length > 0) {
        tracks = currentPlaylist.value;
      } else {
        tracks = chartTracks.value;
      }

      if (tracks.length === 0) return;

      let nextIndex = currentIndex.value + 1;
      // Если достигли конца плейлиста
      if (nextIndex >= tracks.length) {
        nextIndex = 0; // Начинаем сначала
      }
      historyTrackList.value.push(currentIndex.value);
      tracklistStore.setCurrentIndex(nextIndex);
      tracklistStore.setCurrentTrack(tracks[nextIndex], nextIndex);
    };

    const prevTrack = () => {
      if (historyTrackList.value.length > 0) {
        pauseTrack();
        currentTime.value = 0;

        const prevIndex = historyTrackList.value.pop()!;
        let tracks;
        if (shuffleTrackList.value.length > 0) {
          tracks = shuffleTrackList.value;
        } else if (currentPlaylist.value.length > 0) {
          tracks = currentPlaylist.value;
        } else {
          tracks = chartTracks.value;
        }

        if (tracks[prevIndex]) {
          tracklistStore.setCurrentIndex(prevIndex);
          tracklistStore.setCurrentTrack(tracks[prevIndex], prevIndex);
        }
      } else if (currentIndex.value > 0) {
        pauseTrack();
        currentTime.value = 0;

        const prevIndex = currentIndex.value - 1;
        let tracks;
        if (shuffleTrackList.value.length > 0) {
          tracks = shuffleTrackList.value;
        } else if (currentPlaylist.value.length > 0) {
          tracks = currentPlaylist.value;
        } else {
          tracks = chartTracks.value;
        }
        if (tracks[prevIndex]) {
          tracklistStore.setCurrentIndex(prevIndex);
          tracklistStore.setCurrentTrack(tracks[prevIndex], prevIndex);
        }
      }
    };

    const toggleLike = () => {
      if (currentTrack.value) {
        tracklistStore.postLikedTrack(currentTrack.value.id);
      }
    };

    // Watchers
    watch(currentTrack, (newTrack) => {
      if (newTrack && audioPlayer.value) {
        // Сбрасываем время и перезагружаем аудио
        currentTime.value = 0;
        duration.value = 0;
        audioPlayer.value.load();

        // Автовоспроизведение при смене трека
        setTimeout(() => {
          playTrack();
        }, 200);
      }
    });

    watch(isPlaying, (playing) => {
      if (playing && audioPlayer.value) {
        audioPlayer.value.play();
      } else if (!playing && audioPlayer.value) {
        audioPlayer.value.pause();
      }
    });

    // Инициализация при монтировании компонента
    onMounted(async () => {
      try {
        setTimeout(async () => {
          await tracklistStore.getChartTracks(userStore.getId);
        }, 200);
        if (audioPlayer.value) {
          audioPlayer.value.addEventListener("loadedmetadata", () => {
            duration.value = audioPlayer.value?.duration || 0;
          });

          audioPlayer.value.volume = volume.value;
        }

        // Инициализируем shuffle плейлист если нужно
        if (isActiveRandom.value) {
          shuffleTrackList.value = shuffleArray(chartTracks.value);
        }
      } catch (err) {
        console.log("Error loading track", err);
      }
    });

    return {
      audioPlayer,
      isPlaying,
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
      currentIndex,
      historyTrackList,
      shuffleTrackList,
      randomTrack,
      settings
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

.dark {
  background: #181818 !important;
  color: #fff;
}

.light {
  background: #ededed !important;
  color: #000;
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
