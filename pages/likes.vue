<template>
  <div class="like-container">
    <!-- Hero секция с обложкой -->
    <div class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-content">
        <div class="hero-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
        <div class="hero-info">
          <h1 class="hero-title">Liked Songs</h1>
          <p class="hero-subtitle">
            {{ trackListStore.favoriteTracks.length }} songs
          </p>
        </div>
      </div>
    </div>

    <!-- Панель управления -->
    <div class="controls-panel">
      <div class="controls-left">
        <button class="play-all-btn" @click="playAll">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Play All</span>
        </button>
        <button class="shuffle-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M17.5 6.5L21 10l-3.5 3.5M3 3l18 18M3 21L21 3M17.5 17.5L14 21l3.5-3.5"
            />
          </svg>
          <span>Shuffle</span>
        </button>
      </div>

      <div class="controls-right">
        <div class="search-wrapper" :class="{ active: isSearchActive }">
          <button class="icon-btn" @click="toggleSearch">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="search-input"
          />
        </div>

        <button class="icon-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Таблица треков -->
    <div class="tracks-table">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title">Title</div>
        <div class="col-album">Album</div>
        <div class="col-date">Date added</div>
        <div class="col-duration">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7z"
            />
          </svg>
        </div>
        <div class="col-action"></div>
      </div>

      <div class="tracks-list">
        <RecycleScroller
          v-if="filteredTracks.length > 0"
          class="track-scroller"
          :items="filteredTracks"
          :item-size="56"
          key-field="id"
          @scroll-end="handleScrollEnd"
          v-slot="{ item, index }"
        >
          <div
            class="track-item"
            :class="{ playing: currentPlayingId === item.id }"
            @dblclick="playTrack(item)"
          >
            <div class="col-index">
              <span class="index-number">{{ index + 1 }}</span>
              <button class="play-btn-small" @click.stop="playTrack(item)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            <div class="col-title">
              <div class="track-info">
                <div class="track-cover">
                  <img
                    :src="item.coverUrl || '/default-cover.jpg'"
                    :alt="item.title"
                  />
                </div>
                <div class="track-details">
                  <div class="track-name">{{ item.title }}</div>
                  <nuxt-link
                    :to="`/artist/${item.artistId}`"
                    class="track-artist"
                  >
                    {{ item.artist }}
                  </nuxt-link>
                </div>
              </div>
            </div>

            <div class="col-album">
              <nuxt-link :to="`/album/${item.albumId}`" class="album-link">
                {{ item.album }}
              </nuxt-link>
            </div>

            <div class="col-date">
              <span>{{ formatDate(item.addedAt) }}</span>
            </div>

            <div class="col-duration">
              <span>{{ formatDuration(item.duration) }}</span>
            </div>

            <div class="col-action">
              <button
                class="like-btn"
                @click.stop="trackListStore.postLikedTrack(item.id)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </RecycleScroller>

        <!-- Состояние загрузки -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading...</p>
        </div>

        <!-- Пустое состояние -->
        <div
          v-else-if="filteredTracks.length === 0 && !isLoading"
          class="empty-state"
        >
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
          <h3>No liked songs yet</h3>
          <p>Start adding songs to your library</p>
          <button class="browse-btn" @click="navigateToDiscover">
            Browse Songs
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useTracklistStore } from "~/stores/tracklist";
import { useUserStore } from "#imports";
import type { Track } from "~/types";
import { RecycleScroller } from "vue3-virtual-scroller";
import { navigateTo } from "#app";

const trackListStore = useTracklistStore();
const userStore = useUserStore();

const isSearchActive = ref(false);
const searchQuery = ref("");
const currentPlayingId = ref<string | null>(null);

const isLoading = ref(false);

const likedTracks = computed(() => trackListStore.favoriteTracks || []);

const filteredTracks = computed(() => {
  if (!searchQuery.value) return likedTracks.value;

  const query = searchQuery.value.toLowerCase();
  return likedTracks.value.filter(
    (track: Track) =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album?.toLowerCase().includes(query),
  );
});

const loadingData = async () => {
  isLoading.value = true;
  try {
    if (trackListStore.currentOfset === 0) {
      trackListStore.clearFavoriteTracks();
    }
    await trackListStore.getLikedPlayList();
  } catch (err) {
    console.error("Error loading liked tracks:", err);
  } finally {
    isLoading.value = false;
  }
};

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
  if (!isSearchActive.value) {
    searchQuery.value = "";
  }
};

const handleScrollEnd = async () => {
  if (!isLoading.value) {
    await trackListStore.getLikedPlayList();
  }
};

const playAll = () => {
  if (filteredTracks.value.length > 0) {
    trackListStore.setCurrentPlaylist(filteredTracks.value);
    trackListStore.playTrack(filteredTracks.value[0]);
  }
};

const playTrack = (track: Track) => {
  currentPlayingId.value = track.id;
  trackListStore.setCurrentPlaylist(filteredTracks.value);
  trackListStore.playTrack(track);
};

const formatDuration = (seconds?: number) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const navigateToDiscover = () => {
  navigateTo("/discover");
};

onMounted(async () => {
  if (userStore.getId && likedTracks.value.length === 0) {
    await loadingData();
  }
});
</script>

<style scoped lang="scss">
.like-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
}

// Hero секция - уменьшены отступы
.hero-section {
  position: relative;
  padding: 24px 24px 16px 24px;
  overflow: hidden;

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, #1ed760 0%, #1a1a1a 100%);
    opacity: 0.3;
    filter: blur(50px);
  }

  .hero-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;

    .hero-icon {
      svg {
        width: 56px;
        height: 56px;
        color: #1ed760;
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
      }
    }

    .hero-info {
      .hero-title {
        font-size: 48px;
        font-weight: 700;
        margin: 0 0 4px 0;
        background: linear-gradient(135deg, #ffffff 0%, #1ed760 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: 12px;
        color: #b3b3b3;
        margin: 0;
      }
    }
  }
}

// Панель управления - уменьшены отступы
.controls-panel {
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .controls-left {
    display: flex;
    gap: 12px;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 20px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .play-all-btn {
      background: #1ed760;
      color: #000000;
      border: none;

      &:hover {
        background: #1fdf64;
        transform: scale(1.02);
      }
    }

    .shuffle-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;

      &:hover {
        border-color: #1ed760;
        background: rgba(30, 215, 96, 0.1);
      }
    }
  }

  .controls-right {
    display: flex;
    gap: 8px;

    .icon-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      svg {
        width: 18px;
        height: 18px;
        color: #b3b3b3;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);

        svg {
          color: #ffffff;
        }
      }
    }

    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 24px;
      padding: 2px 10px;
      transition: all 0.3s ease;

      &.active {
        background: rgba(255, 255, 255, 0.1);

        .search-input {
          width: 160px;
        }
      }

      .search-input {
        width: 0;
        padding: 6px 0;
        border: none;
        background: transparent;
        color: #ffffff;
        font-size: 13px;
        transition: width 0.3s ease;

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: #b3b3b3;
          font-size: 12px;
        }
      }

      .icon-btn {
        padding: 2px;
      }
    }
  }
}

// Таблица треков - уменьшены отступы
.tracks-table {
  padding: 0 24px 24px 24px;

  .table-header {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 100px 60px 40px;
    padding: 8px 12px;
    color: #b3b3b3;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .col-duration {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      svg {
        opacity: 0.7;
      }
    }
  }

  .tracks-list {
    .track-item {
      display: grid;
      grid-template-columns: 40px 1fr 1fr 100px 60px 40px;
      padding: 8px 12px;
      border-radius: 6px;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.08);

        .play-btn-small {
          opacity: 1;
        }

        .index-number {
          opacity: 0;
        }
      }

      &.playing {
        background: rgba(30, 215, 96, 0.1);

        .track-name {
          color: #1ed760;
        }
      }

      .col-index {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .index-number {
          font-size: 13px;
          color: #b3b3b3;
          transition: opacity 0.2s ease;
        }

        .play-btn-small {
          position: absolute;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px;
          opacity: 0;
          transition: opacity 0.2s ease;

          svg {
            width: 14px;
            height: 14px;
            color: #ffffff;
          }

          &:hover svg {
            color: #1ed760;
          }
        }
      }

      .col-title {
        .track-info {
          display: flex;
          align-items: center;
          gap: 10px;

          .track-cover {
            width: 36px;
            height: 36px;
            border-radius: 4px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .track-details {
            .track-name {
              font-size: 13px;
              font-weight: 500;
              color: #ffffff;
              margin-bottom: 2px;
              line-height: 1.3;
            }

            .track-artist {
              font-size: 11px;
              color: #b3b3b3;
              text-decoration: none;
              transition: color 0.2s ease;

              &:hover {
                color: #ffffff;
                text-decoration: underline;
              }
            }
          }
        }
      }

      .col-album {
        display: flex;
        align-items: center;

        .album-link {
          font-size: 13px;
          color: #b3b3b3;
          text-decoration: none;
          transition: color 0.2s ease;

          &:hover {
            color: #ffffff;
            text-decoration: underline;
          }
        }
      }

      .col-date {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #b3b3b3;
      }

      .col-duration {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 12px;
        color: #b3b3b3;
      }

      .col-action {
        display: flex;
        align-items: center;
        justify-content: center;

        .like-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px;
          opacity: 0.6;
          transition: all 0.2s ease;

          svg {
            width: 16px;
            height: 16px;
            color: #1ed760;
          }

          &:hover {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      }
    }
  }
}

// Состояния загрузки и пустого списка - уменьшены отступы
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-top-color: #1ed760;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .empty-icon {
    svg {
      width: 64px;
      height: 64px;
      color: #b3b3b3;
      opacity: 0.5;
      margin-bottom: 16px;
    }
  }

  h3 {
    font-size: 20px;
    margin: 0 0 4px 0;
  }

  p {
    color: #b3b3b3;
    font-size: 13px;
    margin: 0 0 20px 0;
  }

  .browse-btn {
    background: #1ed760;
    color: #000000;
    border: none;
    padding: 8px 24px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #1fdf64;
      transform: scale(1.02);
    }
  }
}

.track-scroller {
  height: calc(100vh - 320px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Адаптивность
@media (max-width: 1024px) {
  .tracks-table {
    .table-header,
    .track-item {
      grid-template-columns: 40px 1fr 1fr 60px 40px;
    }

    .col-date {
      display: none;
    }

    .table-header .col-date {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 16px;

    .hero-content {
      .hero-icon svg {
        width: 40px;
        height: 40px;
      }

      .hero-info .hero-title {
        font-size: 28px;
      }
    }
  }

  .controls-panel {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;

    .controls-left,
    .controls-right {
      width: 100%;
      justify-content: center;
    }
  }

  .tracks-table {
    padding: 0 16px 16px 16px;

    .table-header,
    .track-item {
      grid-template-columns: 36px 1fr 50px 36px;
    }

    .col-album {
      display: none;
    }

    .table-header .col-album {
      display: none;
    }

    .col-date {
      display: none;
    }

    .table-header .col-date {
      display: none;
    }
  }
}
</style>
