<template>
  <div class="error-container">
    <div class="background-overlay">
        <img class="svg-0" src="./assets/svg/header/header-1.svg" alt="svg-0">
        <img class="svg-1" src="./assets/svg/header/header-1.svg" alt="svg-1">
    </div>
    <div class="main-info">
        <span class="span-header-404">404</span>
        <span class="span-header">NOT FOUND!</span>
        <b>Такой страницы не существует!</b>
        <NuxtLink to="/" class="nav_back">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import './error.scss';
.background-image {
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
}

.error-container {
    background-image: url(https://avatars.mds.yandex.net/i?id=48d08e503a2d405251a5fe65e505463f_l-5856184-images-thumbs&n=13);
}
</style>
