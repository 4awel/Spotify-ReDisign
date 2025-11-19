<template>
  <div class="artist-container">
    <div class="avatar-artist">
        <img src="" alt="artist">
    </div>
    <div class="action-artist">
        
    </div>
    <div class="tracklist-artist">
        <div class="track">

        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const { artist } = useRoute().params;
</script>

<style scoped lang="scss">

</style>