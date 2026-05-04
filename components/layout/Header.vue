<template>
  <header class="header" :class="settings.theme">
    <div class="header__left">
      <nav class="nav">
        <!-- Кнопки навигации -->
        <nuxt-link
          v-for="(button, index) in btnRoute.buttons"
          :key="index"
          class="nav__button"
          :class="{ 'nav__button--active': $route.path == button.link }"
          @click="setActiveButton(index)"
          :to="button.link"
        >
          <img :src="button.image" :alt="button.title" class="nav__icon" />
          <span class="nav__text">{{ button.title }}</span>
        </nuxt-link>

        <!-- Поиск -->
        <div class="search" :class="settings.theme">
          <label for="search" class="search__label">
            <div class="search__icon">
              <img :src="btnRoute.inputs[0]?.image" alt="Search" />
            </div>
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            class="search__input"
            :class="settings.theme"
            v-model="searchQuery"
            @input="goSearch"
          />
          <button
            @click="sendSearch"
            class="search-btn"
            :class="settings.theme"
          >
            Search
          </button>
        </div>
      </nav>
    </div>
    <div class="header__right">
      <!-- Группа действий -->
      <div class="actions">
        <button
          v-for="(action, index) in groupAction"
          :key="index"
          class="actions__button"
          @click="handleAction(index)"
          :class="{ active: index == 2 && activityStore.isActivityOpen }"
        >
          <img
            :src="action.image"
            :alt="`action-${index}`"
            class="actions__icon"
          />
        </button>

        <!-- Аватар -->
        <span>{{ userStore.getUsername }}</span>
        <button class="avatar" @click="toggleProfileMenu">
          <img
            src="https://avatars.mds.yandex.net/i?id=d5228bcdeca0d1ed3fdba49e072ff56d_l-15153803-images-thumbs&n=13"
            alt="User avatar"
            class="avatar__image"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { navigateTo } from "#app";
import type { SettingsUser } from "~/types/user";

// SVG NAV
import header0 from "@/assets/svg/header/header-0.svg";
import header1 from "@/assets/svg/header/header-1.svg";
import header2 from "@/assets/svg/header/header-2.svg";
// SVG ACTION
import headerAction0 from "@/assets/svg/header/header-action-0.svg";
import headerAction1 from "@/assets/svg/header/header-action-1.svg";
import headerAction2 from "@/assets/svg/header/header-action-2.svg";
import headerAction3 from "@/assets/svg/header/header-action-3.svg";

interface HeaderType {
  image: string;
  title: string;
  link?: string;
}

interface ActionType {
  image: string;
  isActive: boolean;
}

import { useActivityStore } from "~/stores/activity";
import { useSearchStore } from "~/stores/search";
import { useUserStore } from "~/stores/user";
import { useAuth } from "~/ composables/useAuth";

export default defineComponent({
  setup() {
    const { logout } = useAuth();
    const activeButton = ref(0);
    const searchQuery = ref("");
    const isProfileMenuOpen = ref(false);

    const activityStore = useActivityStore();
    const searchStore = useSearchStore();

    const userStore = useUserStore();

    const settings: SettingsUser = userStore.getSettings;

    watch(searchQuery, (newValue) => {
      searchStore.search(newValue);
    });

    const btnRoute = {
      buttons: [
        {
          image: header0,
          title: "Home",
          link: "/",
        },
        {
          image: header1,
          title: "Discover",
          link: "/discover",
        },
      ] as HeaderType[],
      inputs: [
        {
          image: header2,
          title: "Search",
          link: "/search",
        },
      ] as HeaderType[],
    };

    const groupAction = [
      { image: headerAction0 },
      { image: headerAction1 },
      { image: headerAction2 },
      { image: headerAction3 },
    ] as ActionType[];

    const setActiveButton = (index: number) => {
      activeButton.value = index;
    };

    const handleAction = (index: number) => {
      switch (index) {
        case 0:
          // Действие для headerAction0
          console.log("Action 0 clicked");
          break;
        case 1:
          // Действие для headerAction1
          console.log("Action 1 clicked");
          break;
        case 2:
          activityStore.toggleFriendsActivityOpen();
          break;
        case 3:
          navigateTo("/settings");
          break;
      }
    };

    const sendSearch = () => {
      searchStore.searchOnAPI();
    };

    const toggleProfileMenu = () => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value;
    };

    const goSearch = () => {
      return navigateTo("/search");
    };

    return {
      btnRoute,
      groupAction,
      activeButton,
      searchQuery,
      isProfileMenuOpen,
      setActiveButton,
      handleAction,
      toggleProfileMenu,
      activityStore,
      goSearch,
      searchStore,
      sendSearch,
      userStore,
      logout,
      settings,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../layout/styles/Header.scss";

.active {
  background-color: #282828;
}

.dark {
  color: #fff;
  background: #181818;
}

.light {
  color: #000;
  background: #fff;
}

.search-btn {
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  color: #1ed760;
  transition: all 0.3s ease;
}
</style>
