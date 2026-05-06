<template>
  <div :class="[settings.theme, 'container']">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <Header class="header" />
      <div class="pages-route">
        <div class="content-wrapper">
          <NuxtPage />
        </div>
        <Transition name="activity-slide">
          <FriendActivity
            v-if="activityStore.isActivityOpen"
            class="activity"
          />
        </Transition>
        <Transition name="banner-slide">
          <TrackBanner v-if="bannerTrack.isOpenBanner" class="activity" />
        </Transition>
      </div>
      <Record class="record" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "~/components/layout/Sidebar.vue";
import Header from "~/components/layout/Header.vue";
import Record from "~/components/layout/Record.vue";
import { useActivityStore } from "@/stores/activity";
import { useBannerTrack } from "~/stores/bannertrack";
import { useAuth } from "~/ composables/useAuth";
import { useUserStore } from "~/stores/user";
import type { SettingsUser, UserState } from "~/types/user";
import { onMounted } from "vue";
import { useTracklistStore } from "~/stores/tracklist";
const { initializeAuth } = useAuth();

const activityStore = useActivityStore();
const bannerTrack = useBannerTrack();
const userStore = useUserStore();
const { getUserData } = useAuth();
const TrackListStore = useTracklistStore();

const settings: SettingsUser = userStore.getSettings;

onMounted(async () => {
  try {
    const userData: UserState = await getUserData();
    userStore.setUser({
      id: userData.id,
      email: userData.email,
      username: userData.username,
      likedTracks: userData.likedTracks || [],
    });
  } catch (error) {
    console.error("Error initializing", error);
  } finally {
    initializeAuth();
  }
});
</script>

<style lang="scss">
// Глобальные стили (без scoped)
html,
body {
  margin: 0;
  padding: 0;
  background: #000000;
  overflow-x: hidden;
}

#__nuxt {
  min-height: 100vh;
}

// Темы
.dark {
  --bg-primary: #000000;
  --bg-secondary: #0a0a0a;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --border-color: #181818;
}

.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
}
</style>

<style lang="scss" scoped>
@import "./default.scss";

.container {
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.sidebar {
  width: 320px;
  flex-shrink: 0;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;
}

.main-content {
  margin-left: 320px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  width: calc(100% - 320px);
  background: var(--bg-primary);
}

.header {
  padding: 38px 20px;
  position: sticky;
  top: 0;
  z-index: 90;
  background: var(--bg-primary); // Используем CSS переменную
}

.pages-route {
  display: flex;
  gap: 8px;
  padding: 0;
  position: relative;
  margin-bottom: 100px;
  margin-right: 24px;
  margin-left: 20px;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 175px);
  scrollbar-color: #1ed760 var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-primary);
}

.record {
  position: fixed;
  bottom: 4px;
  right: 0;
  width: calc(100% - 356px);
  z-index: 95;
  border-radius: 20px;
  margin: 0 20px;
}

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

.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.banner-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.banner-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.banner-slide-enter-to,
.banner-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

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
  background: var(--bg-primary);
}

// Адаптивность
@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }

  .main-content {
    margin-left: 280px;
    width: calc(100% - 280px);
  }

  .record {
    left: 280px;
    width: calc(100% - 280px);
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 110;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .record {
    left: 0;
    width: 100%;
  }

  .pages-route {
    padding-bottom: 80px;
  }
}

@media (max-width: 640px) {
  .pages-route {
    padding-bottom: 70px;
  }
}
</style>
