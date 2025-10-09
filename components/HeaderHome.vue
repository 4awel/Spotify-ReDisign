<template>
  <div class="container-header-home">
    <div class="header-home">
      <nav class="home-group-btn">
        <li
          class="home-btn-item"
          :class="{ 'active-header-btn': activeButton === index }"
          @click="togglerButtonRoute(index)"
          v-for="(item, index) in groupBtn"
          :key="index"
        >
          <nuxt-link class="home-link">
            {{ item.title }}
          </nuxt-link>
        </li>
      </nav>
      <div class="svg-menu">
        <img src="../assets/svg/homePage/menu.svg" alt="menu" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

interface ButtonsType {
  title: string;
  link: string;
}

const activeButton = ref(0);

const groupBtn = [
  {
    title: "All",
    link: "/all",
  },
  {
    title: "Music",
    link: "/music",
  },
  {
    title: "Podcasts",
    link: "/podcasts",
  },
  {
    title: "Audiobooks",
    link: "/audiobooks",
  },
] as ButtonsType[];

const togglerButtonRoute = (index: number) => {
  activeButton.value = index;
};

</script>

<style scoped>

.container-header-home {
  position: sticky;
  top: 0;
  z-index: 4;
  background: #1818185a;
  padding: 12px 20px;
}

.svg-menu {
    cursor: pointer;
    padding: 20px 30px;
    filter: brightness(90%);
    transition: all 0.3s ease;
}

.svg-menu:hover {
    transform: rotate(90deg);
    filter: brightness(140%);
}

.svg-menu img {
    width: 30px;
    height: 30px;
}

.home-group-btn {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 12px;
}

.home-btn-item {
  list-style: none;
  border: none;
  background: #181818;
  padding: 12px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  transform: translateY(0);
  cursor: pointer;
}

.active-header-btn {
  background: #ffffff;
  .home-link {
    color: #181818;
  }
}

.home-btn-item:hover {
  background: #ffffff;
  transform: translateY(-4px);

  .home-link {
    color: #181818;
  }
}

.home-link {
  text-decoration: none;
  font-size: 20px;
  color: #b3b3b3;
  transition: all 0.3s ease;
}

.header-home {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: sticky;
}
</style>
