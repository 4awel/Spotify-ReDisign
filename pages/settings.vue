<template>
  <div
    class="container-settings"
    :class="{ 'dark-theme': settings.theme === 'dark' }"
  >
    <div class="settings-header">
      <h1>Settings</h1>
      <p>Manage your account preferences</p>
    </div>

    <div class="settings-content">
      <!-- Theme Settings -->
      <div class="settings-card">
        <div class="card-header">
          <svg
            class="card-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2>Appearance</h2>
        </div>
        <div class="theme-selector">
          <button
            class="theme-option"
            :class="{ active: settings.theme === 'light' }"
            @click="setTheme('light')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </svg>
            <span>Light</span>
          </button>
          <button
            class="theme-option"
            :class="{ active: settings.theme === 'dark' }"
            @click="setTheme('dark')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
            <span>Dark</span>
          </button>
        </div>
      </div>

      <!-- Account Settings -->
      <div class="settings-card">
        <div class="card-header">
          <svg
            class="card-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h2>Profile Information</h2>
        </div>

        <div class="profile-layout">
          <!-- Profile Preview -->
          <div class="profile-preview">
            <div class="avatar-section">
              <div
                class="avatar-large"
                :style="{ backgroundImage: `url(${avatarPreview})` }"
              >
                <div class="avatar-overlay">
                  <label for="avatar-input" class="change-avatar-btn">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                      />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </label>
                </div>
              </div>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                @change="handleAvatarChange"
                style="display: none"
              />
            </div>
            <div class="profile-info-preview">
              <div class="preview-field">
                <label>Username</label>
                <p>{{ userFormData.username || "Not set" }}</p>
              </div>
              <div class="preview-field">
                <label>Email</label>
                <p>{{ userFormData.email || "Not set" }}</p>
              </div>
            </div>
          </div>

          <!-- Edit Form -->
          <form class="profile-form" @submit.prevent="saveProfile">
            <div class="form-group">
              <label>Username</label>
              <input
                v-model="userFormData.username"
                type="text"
                placeholder="Enter username"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Email address</label>
              <input
                v-model="userFormData.email"
                type="email"
                placeholder="Enter email"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>New password</label>
              <input
                v-model="userFormData.password"
                type="password"
                placeholder="••••••••"
                class="form-input"
              />
            </div>

            <button type="submit" class="btn-save">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                />
                <path d="M17 21v-4H7v4M12 3v5" />
              </svg>
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="settings-card danger-zone">
        <div class="card-header">
          <svg
            class="card-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <h2>Account Management</h2>
        </div>
        <div class="danger-actions">
          <button class="btn-logout" @click="logoutAcc">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
          <p class="danger-hint">Sign out from your current session</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import type { SettingsUser } from "~/types/user";
import { useAuth } from "~/ composables/useAuth";
import { navigateTo } from "#app";

type userForm = {
  username?: string;
  avatar?: string;
  email?: string;
  password?: string;
};

const userStore = useUserStore();
const { logout } = useAuth();

const userFormData = ref<userForm>({
  username: userStore.getUsername,
  avatar: "",
  email: userStore.getEmail,
  password: "",
});

const settings: SettingsUser = userStore.getSettings;
const avatarPreview = ref("");

const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
      userFormData.value.avatar = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const saveProfile = () => {
  // Here you would typically save to your backend/store
  userStore.updateUserInfo(userFormData.value);
  // Show success message (you can add a toast notification)
  console.log("Profile saved:", userFormData.value);
};

const setTheme = (theme: "light" | "dark") => {
  settings.theme = theme;
  userStore.updateSettings(settings);
};

const logoutAcc = async () => {
  await logout();
  navigateTo("/login");
};

onMounted(() => {
  if (userFormData.value.avatar) {
    avatarPreview.value = userFormData.value.avatar;
  }
});
</script>

<style scoped>
.container-settings {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  padding: 40px;
  transition: all 0.3s ease;
}

.container-settings.dark-theme {
  background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  color: #fff;
}

.settings-header {
  max-width: 1200px;
  margin: 0 auto 40px;
}

.settings-header h1 {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 8px;
  background: linear-gradient(135deg, #1db954 0%, #1ed760 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.settings-header p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.dark-theme .settings-header p {
  color: #b3b3b3;
}

.settings-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.settings-card {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.dark-theme .settings-card {
  background: #1f1f1f;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.dark-theme .card-header {
  border-bottom-color: #2a2a2a;
}

.card-icon {
  width: 24px;
  height: 24px;
  color: #1db954;
}

.card-header h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

/* Theme Selector */
.theme-selector {
  display: flex;
  gap: 16px;
}

.theme-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  background: #f8f8f8;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  font-weight: 500;
}

.dark-theme .theme-option {
  background: #000;
  border-color: #3a3a3a;
  color: #fff;
}

.theme-option svg {
  width: 20px;
  height: 20px;
}

.theme-option.active {
  background: #1db954;
  border-color: #1db954;
  color: #fff;
}

.theme-option.active svg {
  color: #fff;
}

/* Profile Layout */
.profile-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
}

.profile-preview {
  text-align: center;
}

.avatar-large {
  width: 200px;
  height: 200px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1db954 0%, #1ed760 100%);
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.avatar-large:hover {
  transform: scale(1.05);
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.avatar-large:hover .avatar-overlay {
  opacity: 1;
}

.change-avatar-btn {
  cursor: pointer;
  padding: 12px;
}

.change-avatar-btn svg {
  width: 32px;
  height: 32px;
  color: #fff;
}

.profile-info-preview {
  text-align: left;
  background: #f8f8f8;
  border-radius: 16px;
  padding: 16px;
}

.dark-theme .profile-info-preview {
  background: #2a2a2a;
}

.preview-field {
  margin-bottom: 12px;
}

.preview-field label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}

.dark-theme .preview-field label {
  color: #b3b3b3;
}

.preview-field p {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #333;
}

.dark-theme .preview-field p {
  color: #fff;
}

/* Profile Form */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.dark-theme .form-group label {
  color: #e0e0e0;
}

.form-input {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: #fff;
}

.dark-theme .form-input {
  background: #2a2a2a;
  border-color: #3a3a3a;
  color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #1db954;
  box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.1);
}

.btn-save {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 28px;
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 500px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.btn-save svg {
  width: 20px;
  height: 20px;
}

.btn-save:hover {
  background: #1ed760;
  transform: scale(1.02);
}

/* Danger Zone */
.danger-zone {
  border: 2px solid rgba(220, 38, 38, 0.2);
}

.dark-theme .danger-zone {
  border-color: rgba(220, 38, 38, 0.3);
}

.danger-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  border: 2px solid #dc2626;
  border-radius: 500px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout svg {
  width: 20px;
  height: 20px;
}

.btn-logout:hover {
  background: #dc2626;
  color: #fff;
}

.danger-hint {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.dark-theme .danger-hint {
  color: #b3b3b3;
}

/* Responsive */
@media (max-width: 768px) {
  .container-settings {
    padding: 20px;
  }

  .settings-header h1 {
    font-size: 32px;
  }

  .profile-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .profile-preview {
    text-align: center;
  }

  .settings-card {
    padding: 20px;
  }
}
</style>
