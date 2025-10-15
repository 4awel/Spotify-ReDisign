<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <Header class="header" />
      <div class="pages-route">
        <div class="content-wrapper">
          <NuxtPage />
        </div>
        <Transition name="activity-slide">
          <FriendActivity v-if="activityStore.isActivityOpen" class="activity" />
        </Transition>
      </div>
      <Record class="record" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue';
import Header from '~/components/layout/Header.vue';
import Record from '~/components/layout/Record.vue';
import { useActivityStore } from '@/stores/activity';

const activityStore = useActivityStore();
</script>

<style lang="scss" scoped>
@import './default.scss';

// Анимации для FriendActivity
.activity-slide-enter-active,
.activity-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.activity-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.activity-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.activity-slide-enter-to,
.activity-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

// Стили для контейнеров
.pages-route {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  transition: all 0.4s ease;
}

.activity {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 600px;
  z-index: 10;
  background-color: #000000;
}

// Когда активность открыта, немного сдвигаем основной контент
.activity-slide-enter-active ~ .content-wrapper,
.activity-slide-leave-active ~ .content-wrapper {
  margin-right: 300px;
  transition: margin-right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>