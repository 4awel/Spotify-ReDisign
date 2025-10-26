<template>
  <div class="container-activity">
    <div class="container-action">
      <div class="header-action">
        <h3>Friends Activity</h3>
      </div>
      <div class="group-action">
        <div class="svg-adduser svg">
          <img src="../assets/svg/FriendActivity/adduser.svg" alt="adduser" />
        </div>
        <div @click="closeActivity" class="svg-close svg">
          <img src="../assets/svg/FriendActivity/close.svg" alt="close" />
        </div>
      </div>
    </div>
    <div
      v-for="(item, index) in friends"
      :key="index"
      class="container-friends"
    >
      <div class="avatar">
        <img :src="item.avatar" alt="avatar" />
      </div>
      <div class="info">
        <div class="username">
          <b>{{ item.username }}</b>
        </div>
        <div class="current-data">
          <div v-if="item.currentState === 'online'" class="svg-current-state">
            <img src="../assets/svg/FriendActivity/online.svg" alt="online" />
          </div>
          <span v-else style="color: #7d7d7d; font-size: 18px">{{
            item.currentState
          }}</span>
          <div class="current-track">
            {{ item.track.title }} - <span>{{ item.track.artist }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FriendsType {
  avatar: string;
  username: string;
  track: {
    artist: string;
    title: string;
  };
  currentState: string;
}

import { useActivityStore } from '@/stores/activity';

interface Emit {
  (e: 'close-activity', value: boolean): void
}

const state = "online";

const emit = defineEmits<Emit>();

const activityStore = useActivityStore();

const closeActivity = () => {
  activityStore.toggleFriendsActivityOpen();
}

const friends = [
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 1",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "online",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 2",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "2h",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 3",
    track: {
      artist: "5opka, MellSher, 5opka, MellSherm 5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "3h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 4",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "1h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 1",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "online",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 2",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "2h",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 3",
    track: {
      artist: "5opka, MellSher, 5opka, MellSherm 5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "3h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 4",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "1h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 1",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "online",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 2",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "2h",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 3",
    track: {
      artist: "5opka, MellSher, 5opka, MellSherm 5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "3h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 4",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "1h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 1",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "online",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 2",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "2h",
  },
  {
    avatar:
      "https://yt3.googleusercontent.com/Y9UkqjRvFWffz0Hpv7Pqcxcy6ZczUQfUENrDvYMv7k9_H19fOCwe_kKye03gs6QRZfi7vTP75w=s900-c-k-c0x00ffffff-no-rj",
    username: "Friend 3",
    track: {
      artist: "5opka, MellSher, 5opka, MellSherm 5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "3h",
  },
  {
    avatar:
      "https://avatars.mds.yandex.net/i?id=5ecb5180f7a36744d7378ef36a62e21a5e0dcee8-4230863-images-thumbs&n=13",
    username: "Friend 4",
    track: {
      artist: "5opka, MellSher",
      title: "Тонированный жигуль",
    },
    currentState: "1h",
  },
] as FriendsType[];
</script>

<style scoped>
.container-activity {
  padding: 20px 26px;
  border: 2px solid #181818;
  border-radius: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.3s ease;
  overflow: scroll;
  max-height: 85vh;

  scrollbar-color: #1ed760 #000000;
}

.svg img {
  width: 30px;
  height: 30px;
}

.svg-adduser {
  transition: all 0.3s ease;
}

.svg-adduser:hover {
  transform: translateY(-10px);
}

.svg-close {
  transition: all 0.3s ease;
}

.svg-close:hover {
  transform: rotate(90deg);
}

.username {
  font-size: 16px;
  color: #c6c6c6;
}

.container-friends {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.container-friends:hover {
  border-radius: 20px;
  box-shadow: 2px 0 20px 0px #323232;
  transform: translateY(-5px);
}

.current-data {
  display: flex;
  align-items: center;
  gap: 8px;
}

.svg-current-state img {
  width: 22px;
  height: 22px;
}

.container-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.current-track {
  color: #c6c6c6;
  font-size: 18px;
}

.current-track span {
  color: #7e7e7e;
}

.avatar img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.container-friends {
  display: flex;
  align-items: center;
}

.group-action {
  display: flex;
  cursor: pointer;
  gap: 12px;
}
</style>
