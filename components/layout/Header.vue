<template>
  <header class="header">
    <div class="header__left">
      <nav class="nav">
        <!-- Кнопки навигации -->
        <button 
          v-for="(button, index) in btnRoute.buttons" 
          :key="index" 
          class="nav__button"
          :class="{ 'nav__button--active': activeButton === index }"
          @click="setActiveButton(index)"
        >
          <img :src="button.image" :alt="button.title" class="nav__icon" />
          <span class="nav__text">{{ button.title }}</span>
        </button>
        
        <!-- Поиск -->
        <div class="search">
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
            v-model="searchQuery"
            @input="goSearch"
          />
          <button @click="sendSearch" class="search-btn">Search</button>
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
          :class="{ 'active': index == 2 && activityStore.isActivityOpen }"
        >
          <img :src="action.image" :alt="`action-${index}`" class="actions__icon" />
        </button>
        
        <!-- Аватар -->
        <button class="avatar" @click="toggleProfileMenu">
          <img src="https://avatars.mds.yandex.net/i?id=d5228bcdeca0d1ed3fdba49e072ff56d_l-15153803-images-thumbs&n=13" alt="User avatar" class="avatar__image" />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { navigateTo } from "#app";

// SVG NAV
import header0 from '@/assets/svg/header/header-0.svg'
import header1 from '@/assets/svg/header/header-1.svg'
import header2 from '@/assets/svg/header/header-2.svg'
// SVG ACTION
import headerAction0 from '@/assets/svg/header/header-action-0.svg'
import headerAction1 from '@/assets/svg/header/header-action-1.svg'
import headerAction2 from '@/assets/svg/header/header-action-2.svg'
import headerAction3 from '@/assets/svg/header/header-action-3.svg'

interface HeaderType {
  image: string;
  title: string;
  $state?: string,
}

interface ActionType {
  image: string,
  isActive: boolean
}

import { useActivityStore } from '~/stores/activity';
import { useSearchStore } from "~/stores/search";

export default defineComponent({
  setup() {
    const activeButton = ref(0);
    const searchQuery = ref('');
    const isProfileMenuOpen = ref(false);

    const activityStore = useActivityStore();
    const searchStore = useSearchStore();

    watch(searchQuery, (newValue) => {
      searchStore.search(newValue)
    })

    const btnRoute = {
      buttons: [
        {
          image: header0,
          title: "Home",
        },
        {
          image: header1,
          title: "Discover",
        },
      ] as HeaderType[],
      inputs: [
        {
          image: header2,
          title: "Search",
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
          console.log('Action 0 clicked');
          break;
        case 1:
          // Действие для headerAction1
          console.log('Action 1 clicked');
          break;
        case 2:
          activityStore.toggleFriendsActivityOpen();
          break;
        case 3:
          // Действие для headerAction3
          console.log('Action 3 clicked');
          break;
      }
    };

    const sendSearch = () => {
      searchStore.searchOnAPI();
    }

    const toggleProfileMenu = () => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value;
    };

    const goSearch = () => {
      return navigateTo('/search')
    }

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
      sendSearch
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../layout/styles/Header.scss';

.active {
  background-color: #282828;
}

.search-btn {
  color: #B3B3B3;
  font-size: 16px;
  background-color: #000;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  color: #1ED760;
  transition: all 0.3s ease;
}

</style>