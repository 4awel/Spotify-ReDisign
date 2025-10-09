<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <div class="svg-header">
        <img src="~/assets/svg/sidebar/sidebar-0.svg" alt="svg-header" />
      </div>
      <h2>My Library</h2>
    </div>
    <div class="sidebar-main">
      <nav class="sidebar-nav">
        <li
          class="sidebar-btn-nav"
          v-for="(item, index) in groupBtnSidebar"
          :key="index"
          :class="{ 
            'has-dropdown': item.dropdown, 
            'dropdown-open': openDropdown === index 
          }"
        >
          <!-- Если нет дропа то обычная ссылка -->
          <nuxt-link 
            v-if="!item.dropdown" 
            :to="item.link || '/'" 
            class="sidebar-link"
          >
            <div class="item-svg">
              <img :src="item.image" :alt="item.title" />
            </div>
            <span class="link-text">{{ item.title }}</span>
          </nuxt-link>
          
          <!-- Иначе нет ссылки но есть дроп -->
          <div v-else class="dropdown-trigger" @click="toggleDropdown(index)">
            <div class="items-text">
              <div class="item-svg">
                <img :src="item.image" :alt="item.title" />
              </div>
              <span class="link-text">{{ item.title }}</span>
            </div>
            <div class="arrow-svg" :class="{ 'arrow-rotated': openDropdown === index }">
              <img src="@/assets/svg/sidebar/arrow.svg" alt="arrow-svg">
            </div>
          </div>

          <!-- Dropdown меню -->
          <div v-if="item.dropdown && openDropdown === index" class="dropdown-menu">
            <div class="dropdown-content">
              <!-- Если есть элементы в dropdown -->
              <template v-if="getDropdownItems(item.title).length > 0">
                <div 
                  v-for="(dropdownItem, dropdownIndex) in getDropdownItems(item.title)" 
                  :key="dropdownIndex"
                  class="dropdown-item"
                >
                  <div class="dropdown-item-content">
                    <div class="dropdown-item-svg" v-if="dropdownItem.image">
                      <img :src="dropdownItem.image" :alt="dropdownItem.title" />
                    </div>
                    <span class="dropdown-item-text">{{ dropdownItem.title }}</span>
                  </div>
                </div>
              </template>
              
              <!-- Если dropdown пустой -->
              <div v-else class="dropdown-empty">
                <div class="empty-icon">
                  <img src="" alt="Empty" />
                </div>
                <p class="empty-text">Здесь пока ничего нет</p>
                <button class="empty-action" @click="handleEmptyAction(item.title)">
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </li>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import sidebar1 from "@/assets/svg/sidebar/sidebar-1.svg";
import sidebar2 from "@/assets/svg/sidebar/sidebar-2.svg";
import sidebar3 from "@/assets/svg/sidebar/sidebar-3.svg";
import sidebar4 from "@/assets/svg/sidebar/sidebar-4.svg";
import sidebar5 from "@/assets/svg/sidebar/sidebar-5.svg";
import sidebar6 from "@/assets/svg/sidebar/sidebar-6.svg";
import sidebar7 from "@/assets/svg/sidebar/sidebar-7.svg";
import sidebar8 from "@/assets/svg/sidebar/sidebar-8.svg";
import sidebar9 from "@/assets/svg/sidebar/sidebar-9.svg";

import playlistIcon from "@/assets/svg/sidebar/sidebar-8.svg";

interface DropdownItemType {
  image?: string;
  title: string;
  link?: string;
}

interface SidebarGroupType {
  image: string;
  title: string;
  link?: string;
  dropdown?: boolean;
}

export default defineComponent({
  setup() {
    const openDropdown = ref<number | null>(null);
    
    const groupBtnSidebar = [
      {
        image: sidebar1,
        title: "Pins",
        dropdown: true,
      },
      {
        image: sidebar2,
        title: "Playlists",
        dropdown: true,
      },
      {
        image: sidebar3,
        link: "/liked-songs",
        title: "Liked Songs",
      },
      {
        image: sidebar4,
        link: "/recently-played",
        title: "Recently Played",
      },
      {
        image: sidebar5,
        link: "/albums",
        title: "Albums",
      },
      {
        image: sidebar6,
        link: "/artists",
        title: "Artists",
      },
      {
        image: sidebar7,
        link: "/podcasts",
        title: "Podcasts",
      },
      {
        image: sidebar8,
        link: "/downloads",
        title: "Downloads",
      },
      {
        image: sidebar9,
        link: "/settings",
        title: "Settings",
      },
    ] as SidebarGroupType[];

    // Данные для dropdown
    const dropdownData = {
      "Pins": [
        { title: "Workout Mix", image: playlistIcon },
        { title: "Chill Vibes", image: playlistIcon },
        { title: "Road Trip", image: playlistIcon },
      ],
      "Playlists": [
        { title: "My Playlist #1", image: playlistIcon },
        { title: "Summer Hits", image: playlistIcon },
        { title: "Focus Time", image: playlistIcon },
        { title: "Party Mix", image: playlistIcon },
      ]
    };

    const toggleDropdown = (index: number) => {
      if (openDropdown.value === index) {
        openDropdown.value = null;
      } else {
        openDropdown.value = index;
      }
    };

    const getDropdownItems = (title: string): DropdownItemType[] => {
      return dropdownData[title as keyof typeof dropdownData] || [];
    };

    const handleEmptyAction = (title: string) => {
      console.log(`Add action for: ${title}`);
      // Здесь можно добавить логику для добавления элементов
    };

    return {
      groupBtnSidebar,
      openDropdown,
      toggleDropdown,
      getDropdownItems,
      handleEmptyAction
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../layout/styles/Sidebar.scss';
</style>