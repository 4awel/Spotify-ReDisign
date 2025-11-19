<template>
  <div class="like-container">
    <div class="header">
      <div class="add">
        <div class="add-svg">
          <img src="" alt="add-svg" />
        </div>
      </div>
      <div class="action-group">
        <div class="svg-menu">
          <img src="" alt="svg-row" />
        </div>
        <div class="svg-menu">
          <img src="" alt="svg-wrap" />
        </div>
        <div class="svg-menu">
          <img src="" alt="svg-recent" />
        </div>
        <div class="svg-menu">
          <img src="" alt="svg-filter" />
        </div>
        <div class="search">
          <div class="svg-search">
            <img src="" alt="svg-search" />
          </div>
          <input type="text" />
        </div>
      </div>
    </div>
    <hr />
    <div class="like-tracklist">
      <div class="item">
        <span class="index">1</span>
        <div class="track">
          <div class="image-track">
            <img :src="" alt="image-track" />
          </div>
          <div class="title-track">
            <b>Track Name</b>
            <nuxt-link>Artist Name</nuxt-link>
          </div>
        </div>
        <div class="album">
          <nuxt-link>Album Name</nuxt-link>
        </div>
        <div class="duration">
          <span>3:00</span>
        </div>
        <div class="current-state-like">
          <div class="svg-like">
            <img src="../assets/svg/record/like-full.svg" alt="svg-like" />
          </div>
        </div>
      </div>
      <div class="item">
        <span class="index">1</span>
        <div class="track">
          <div class="image-track">
            <img src="" alt="image-track" />
          </div>
          <div class="title-track">
            <b>Track Name</b>
            <nuxt-link>Artist Name</nuxt-link>
          </div>
        </div>
        <div class="album">
          <nuxt-link>Album Name</nuxt-link>
        </div>
        <div class="duration">
          <span>3:00</span>
        </div>
        <div class="current-state-like">
          <div class="svg-like">
            <img src="../assets/svg/record/like-full.svg" alt="svg-like" />
          </div>
        </div>
      </div>
      <div class="item">
        <span class="index">1</span>
        <div class="track">
          <div class="image-track">
            <img src="" alt="image-track" />
          </div>
          <div class="title-track">
            <b>Track Name</b>
            <nuxt-link>Artist Name</nuxt-link>
          </div>
        </div>
        <div class="album">
          <nuxt-link>Album Name</nuxt-link>
        </div>
        <div class="duration">
          <span>3:00</span>
        </div>
        <div class="current-state-like">
          <div class="svg-like">
            <img src="../assets/svg/record/like-full.svg" alt="svg-like" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useTrackList from '~/stores';
import { watch } from 'vue';

const trackList = useTrackList();

const currentTrack = {};
watch(trackList, (track: any) => {
    currentTrack = track;
})
</script>

<style scoped lang="scss">
.like-container {
  padding: 20px 30px;
}

.like-tracklist {
  display: flex;
  max-width: 60%;
  flex-direction: column;
  gap: 20px;
}

.item {
    width: 100%;
    background-color: #1f1f1f;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header {
  padding: 16px 20px;
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
}

.action-group {
  display: flex;
  gap: 10px;
}

.search {
  display: flex;
  gap: 10px;
}

hr {
  border-color: #000;
}
</style>
