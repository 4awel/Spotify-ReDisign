<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <Header class="header" />
      <div class="pages-route">
        <div class="content-wrapper">
          <NuxtPage />
        </div>
        <FriendActivity class="activity" />
      </div>
      <Record class="record" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Логика компонента, если нужна
import Sidebar from '~/components/layout/Sidebar.vue';
import Header from '~/components/layout/Header.vue';
import Record from '~/components/layout/Record.vue';
</script>

<style lang="scss" scoped>
@import './default.scss';
</style>