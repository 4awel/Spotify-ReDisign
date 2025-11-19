<template>
  <div class="container-track-banner">
    <div class="close-banner">
      <img @click="bannerTrack.closeBanner()" src="../assets/svg/FriendActivity/close.svg" alt="close">
    </div>
    <div class="preview-track">
      <img :src="bannerTrack.currentTrack?.coverUrl" alt="dsds" class="track-image" />
      <div class="play-overlay" >
        <img v-if="!bannerTrack.currentTrack?.isPlaying"
          src="../assets/svg/search/play.svg"
          alt="play"
          class="play-icon"
          @click="handlePlayingTrack(bannerTrack?.currentTrack, bannerTrack?.currentIndex)"
        />
        <img v-else
        @click="trackListStore.pauseTrack()"
          src="../assets/svg/search/stop.svg"
          alt="stop"
          class="play-icon"
        />
      </div>
    </div>
    
    <div class="track-info">
      <h3 class="track-title">{{ bannerTrack.currentTrack?.title}}</h3>
      <a href="#" class="artist-link" @click.prevent="">{{ bannerTrack.currentTrack?.artist }}</a>
      <div class="track-meta">
        <span class="album">{{ bannerTrack.currentTrack?.album }}</span>
        <span class="duration">{{ bannerTrack.currentTrack?.formattedDuration }}</span>
      </div>
    </div>

    <div class="track-actions">
      <button class="like-btn">
        <img v-if="bannerTrack.currentTrack?.isLiked"
          src="../assets/svg/record/like-full.svg"
          alt="liked"
        />
        <img v-else
          src="../assets/svg/record/like-low.svg"
          alt="like"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBannerTrack } from '~/stores/bannertrack';
import { useTracklistStore } from '~/stores/tracklist';
import { watch, ref } from 'vue';
import type { Track } from '~/types';
const bannerTrack = useBannerTrack();
const trackListStore = useTracklistStore();

const handlePlayingTrack = (track: Track, index: number) => {
  trackListStore.setCurrentTrack(track, index)
}

</script>

<style lang="scss" scoped>
.container-track-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  transition: all 0.3s ease;
  cursor: pointer;

}
.close-banner {
  display: flex;
  justify-content: end;
  padding: 10px 6px 0 0;
  width: 100%;
}

.close-banner img {
  widows: 30px;
  height: 30px;
  transition: all 300ms ease;
}

.close-banner img:hover {
  transition: all 300ms ease;
  transform: rotate(90deg);
}

.preview-track {
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  .track-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    .play-icon {
      width: 80px;
      height: 80px;
      opacity: 0.8;
    }
  }

  &:hover .play-overlay {
    opacity: 1;
  }
}

.track-info {
  flex: 1;
  min-width: 0;

  .track-title {
    margin: 0 0 8px 0;
    font-size: 32px;
    max-width: 400px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist-link {
    color: #b3b3b3;
    text-decoration: none;
    font-size: 20px;
    transition: color 0.2s ease;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }

  .track-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;

    .album {
      color: #b3b3b3;
      font-size: 20px;
      max-width: 400px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .duration {
      color: #b3b3b3;
      font-size: 20px;
    }
  }
}

.track-actions {
  .like-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }

    &.liked {
      img {
        filter: brightness(0) saturate(100%) invert(47%) sepia(91%) saturate(2132%) hue-rotate(326deg) brightness(91%) contrast(96%);
      }
    }

    img {
      width: 60px;
      height: 60px;
    }
  }
}

// Адаптивность
@media (max-width: 768px) {
  .container-track-banner {
    padding: 12px;
    gap: 12px;
  }

  .preview-track {
    width: 60px;
    height: 60px;
  }

  .track-info {
    .track-title {
      font-size: 16px;
    }
  }
}
</style>