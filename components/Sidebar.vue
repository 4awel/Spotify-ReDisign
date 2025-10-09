<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <div class="svg-header">
        <img src="../assets/svg/sidebar/sidebar-0.svg" alt="svg-header" />
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
              <img src="../assets/svg/sidebar/arrow.svg" alt="arrow-svg">
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

<style scoped>
.sidebar-container {
  width: 320px;
  height: 100vh;
  background: #000000;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 28px 20px 28px;
  margin-bottom: 20px;
}

.svg-header {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-header img {
  width: 40px;
  height: 40px;
  filter: brightness(0.8);
}

.sidebar-header h2 {
  color: #B3B3B3;
  font-family: 'Circular Std', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.sidebar-main {
  flex: 1;
  overflow-y: auto;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-btn-nav {
  margin: 0;
  padding: 0;
  position: relative;
}

.sidebar-link,
.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 28px;
  color: #B3B3B3;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  font-family: 'Circular Std', sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.sidebar-link:hover,
.dropdown-trigger:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-link.router-link-active {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.08);
}

.item-svg {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.items-text {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #B3B3B3;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  font-family: 'Circular Std', sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.item-svg img {
  width: 100%;
  height: 100%;
  filter: brightness(0.7);
}

.sidebar-link:hover .item-svg img,
.dropdown-trigger:hover .item-svg img,
.sidebar-link.router-link-active .item-svg img {
  filter: brightness(1);
}

.link-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  font-size: 16px;
}

/* Стили для элементов с dropdown */
.has-dropdown .dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow-svg {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.arrow-svg img {
  width: 100%;
  height: 100%;
  filter: brightness(0.7);
}

.arrow-rotated {
  transform: rotate(90deg);
}

.has-dropdown:hover .arrow-svg img {
  filter: brightness(1);
}

/* Dropdown меню */
.dropdown-menu {
  background: rgba(30, 30, 30, 0.95);
  border-left: 3px solid #1ED760;
  margin-left: 28px;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  animation: dropdownSlide 0.3s ease;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.dropdown-content {
  padding: 12px 0;
}

.dropdown-item {
  padding: 0;
  margin: 0;
}

.dropdown-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px 10px 16px;
  color: #B3B3B3;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: 'Circular Std', sans-serif;
  font-size: 15px;
}

.dropdown-item-content:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.05);
}

.dropdown-item-svg {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dropdown-item-svg img {
  width: 100%;
  height: 100%;
  filter: brightness(0.7);
}

.dropdown-item-content:hover .dropdown-item-svg img {
  filter: brightness(1);
}

.dropdown-item-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

/* Стили для пустого состояния */
.dropdown-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  text-align: center;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-icon img {
  width: 100%;
  height: 100%;
}

.empty-text {
  color: #B3B3B3;
  font-family: 'Circular Std', sans-serif;
  font-size: 14px;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.empty-action {
  background: #1ED760;
  color: #000000;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-family: 'Circular Std', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action:hover {
  background: #1FDF64;
  transform: scale(1.05);
}
/* Стили для скроллбара */
.sidebar-main::-webkit-scrollbar {
  width: 10px;
}

.sidebar-main::-webkit-scrollbar-track {
  background: #000000;
}

.sidebar-main::-webkit-scrollbar-thumb {
  background: #535353;
  border-radius: 5px;
}

.sidebar-main::-webkit-scrollbar-thumb:hover {
  background: #727272;
}

/* Анимации */
.sidebar-link,
.dropdown-trigger {
  position: relative;
}

.sidebar-link::before,
.dropdown-trigger::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  width: 4px;
  height: 0;
  background: #1ED760;
  transition: all 0.3s ease;
  border-radius: 0 2px 2px 0;
}

.sidebar-link.router-link-active::before,
.sidebar-link:hover::before,
.dropdown-trigger:hover::before {
  transform: translateY(-50%) scaleX(1);
  height: 70%;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .sidebar-container {
    width: 280px;
  }
  
  .sidebar-header,
  .sidebar-link,
  .dropdown-trigger {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 768px) {
  .sidebar-container {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar-container.mobile-open {
    transform: translateX(0);
  }
}

/* Темная тема как в Spotify */
.sidebar-container {

}

/* Эффект при активном состоянии */
.sidebar-link:active,
.dropdown-trigger:active {
  transform: scale(0.98);
}
</style>