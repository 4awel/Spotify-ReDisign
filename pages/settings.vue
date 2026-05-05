<template>
  <div class="container-settings">
    <h1>Settings</h1>
    <hr />
    <div class="settings-group-theme">
      <h2>Theme settings</h2>
      <button class="btn" :class="settings.theme" @click="changeTheme">
        {{ settings.theme === "light" ? "Light" : "Dark" }}
      </button>
    </div>
    <hr />
    <div class="accout-settings">
      <h2>Account settings</h2>
      <div class="profile">
        <form class="profile-settings">
          <h3>Change your account</h3>
          <label for="">Username</label>
          <input v-model="userFormData.username" type="text" />
          <label for="">Email</label>
          <input v-model="userFormData.email" type="text">
          <label for="">Password</label>
          <input v-model="userFormData.password" type="password" />
          <label for="">Avatar</label>
          <input type="file" />
          <button class="btn" :class="settings.theme">Save</button>
        </form>
        <div class="profile-view">
          <img class="avatar-banner" src="" alt="" />
          <div class="banner"></div>
          <div class="info">
            <span>{{ userFormData.username }}</span>
            <span>{{ userFormData.email }}</span>
          </div>
        </div>
      </div>
      <button class="btn logout" @click="logoutAcc">Log out account</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import type { SettingsUser } from "~/types/user";
import { useAuth } from "~/ composables/useAuth";
import { navigateTo } from "#app";

type userForm = {
    username?: string,
    avatar?: string,
    email?: string,
    password?: string
}

const userStore = useUserStore();

const userFormData = ref<userForm>({
    username: userStore.getUsername,
    avatar: '',
    email: userStore.getEmail,
    password: ''
})

const { logout } = useAuth();

const logoutAcc = async () => {
  await logout();
  navigateTo("/login");
};

const settings: SettingsUser = userStore.getSettings;
const theme = ref(false);

const changeTheme = () => {
  theme.value = !theme.value;
  settings.theme = theme.value ? "light" : "dark";
};
</script>

<style>
.container-settings {
  padding: 0 40px;
}

.settings-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}

.dark {
  background: #fff;
  color: #000;
  transition: all 200ms ease;
}

.banner {
  padding: 20px;
  background: rgb(56, 242, 224);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.profile-view {
  margin-top: 20px;
  border: 2px solid #2a2a2a;
  width: 400px !important;
  height: 150px;
  border-radius: 20px;
}

.avatar-banner {
  border-radius: 50%;
  position: absolute;
  left: 54%;
  margin-top: 20px;
  padding: 40px;
  background: #e251c8;
}

.info {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.dark:hover {
  background: #dbdbdb;
  transition: all 200ms ease;
}

.light {
  background: #000;
  color: #fff;
}

.light:hover {
  background: #414141;
}

.logout {
  background: #f53b3b;
  color: #fff;
  font-size: 16px;
  transition: all 200ms ease;
}

.profile {
  display: flex;
  width: 100%;
}

.logout:hover {
  background: #a52929;
}

.account-settings {
  display: flex;
  width: 100%;
}

.profile-settings {
  width: 450px !important;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  border: 2px solid #2a2a2a;
  border-radius: 20px;
  padding: 0 20px 20px 20px;
}
</style>
