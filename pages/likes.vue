<template>
  <div class="like-container">
    <div class="header">
      <div class="add">
        <div class="add-svg">
          <img src="../assets/svg/FriendActivity/close.svg" alt="add-svg" />
        </div>
      </div>
      <div class="action-group">
        <div class="svg-menu">
          <img src="../assets/svg/liked/sircle-wrap.svg" alt="svg-wrap" />
        </div>
        <div class="svg-menu">
          <img src="../assets/svg/liked/menu-dotted.svg" alt="svg-row" />
        </div>
        <div class="svg-menu">
          <img src="../assets/svg/liked/arrow.svg" alt="svg-recent" />
        </div>
        <div class="svg-menu">
          <img src="../assets/svg/liked/filtre.svg" alt="svg-filter" />
        </div>
        <div class="search" :class="{ active: isSearchActive }">
          <div class="svg-search" @click="toggleSearch">
            <img src="../assets/svg/header/header-2.svg" alt="svg-search" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search in liked songs..."
            @blur="onSearchBlur"
          />
        </div>
      </div>
    </div>
    <hr />
    <div class="like-tracklist">
      <div v-for="(item, index) in userStore.getLikedTracks" :key="index" class="item">
        <span class="index">{{ index + 1 }}</span>
        <div class="track">
          <div class="image-track">
            <img :src="item.coverUrl" alt="image-track" />
          </div>
          <div class="title-track">
            <b>{{ item.title }}</b>
            <nuxt-link>{{ item.artist }}</nuxt-link>
          </div>
        </div>
        <div class="album">
          <nuxt-link>{{ item.album }}</nuxt-link>
        </div>
        <div class="duration">
          <span>{{ item.duration }}</span>
        </div>
        <div class="current-state-like">
          <div class="svg-like">
            <img src="../assets/svg/record/like-full.svg" alt="svg-like" />
          </div>
        </div>
      </div>
      <div v-if="userStore.getLikedPlayList.length === 0" class="null-tracklist-container">
        <h4>Тут пока ничего нет</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/stores/user";
import type { Track } from "~/types";

// Состояние поиска
const isSearchActive = ref(false);
const searchQuery = ref("");
const userStore = useUserStore();
const isLoading = ref(false);
// Моковые данные для демонстрации
const tracks = ref([]);

// Функции для управления поиском
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
  if (!isSearchActive.value) {
    searchQuery.value = "";
  }
};

const onSearchBlur = () => {
  if (!searchQuery.value) {
    isSearchActive.value = false;
  }
};

// Фильтрация треков по поисковому запросу
const filteredTracks = computed(() => {
  if (!searchQuery.value) {
    return tracks.value;
  }

  const query = searchQuery.value.toLowerCase();
  return userStore.getLikedTracksfilter(
    (track: Track) =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
  );
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await userStore.getLikedPlayList();
  } catch (error) {
    console.log(error)
    throw new Error("Error, fetch error")
  } finally {
    isLoading.value = false;
  }
})

</script>

<style scoped lang="scss">
.like-container {
  padding: 20px 30px;
  color: #ffffff;
  min-height: 100vh;
}

.null-tracklist-container {
  color: #5f5f5f;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.like-tracklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 60%;
}

.add-svg img {
  transform: rotate(45deg);
}

.svg-menu img,
.add-svg img {
  width: 26px;
  height: 26px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
}

.item {
  width: 100%;
  padding: 12px 20px;
  display: grid;
  grid-template-columns: 40px 1fr 1fr 80px 40px;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1f1f1f;
  }
}

.track {
  display: flex;
  align-items: center;
  gap: 12px;
}

.image-track {
  width: 40px;
  height: 40px;
  background-color: #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

.title-track {
  display: flex;
  flex-direction: column;
  gap: 4px;

  b {
    font-size: 14px;
    color: #ffffff;
  }

  nuxt-link {
    font-size: 12px;
    color: #b3b3b3;
    text-decoration: none;

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
}

.album {
  nuxt-link {
    color: #b3b3b3;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  }
}

.duration {
  color: #b3b3b3;
  font-size: 14px;
  text-align: right;
}

.index {
  color: #b3b3b3;
  font-size: 14px;
  text-align: center;
}

.current-state-like {
  display: flex;
  justify-content: center;

  .svg-like img {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
}

.header {
  background-color: #000000c9;
  padding: 12px 26px;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  input {
    width: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: #ffffff;
    font-size: 16px;
    transition: all 0.3s ease;
    opacity: 0;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #b3b3b3;
    }
  }

  &.active {
    background-color: #1f1f1f;
    padding: 6px 0px;
    border-radius: 10px;

    input {
      width: 200px;
      opacity: 1;
    }
  }
}

.svg-search {
  cursor: pointer;
  padding: 4px;
  display: flex;

  img {
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}

hr {
  border: none;
  height: 1px;
  background-color: #1f1f1f;
  margin: 6px 0 16px 0;
}

// Адаптивность
@media (max-width: 768px) {
  .like-container {
    padding: 16px;
  }

  .item {
    grid-template-columns: 30px 1fr 60px 30px;
    gap: 12px;
    padding: 10px 12px;
  }

  .album {
    display: none;
  }

  .search.active input {
    width: 150px;
  }

  .action-group {
    gap: 12px;
  }
}
</style>
