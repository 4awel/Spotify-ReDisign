<!-- pages/login.vue -->
<template>
  <div class="login-page-container">
    <header class="header-login">
      <div class="svg-spotify">
        <img src="../assets/svg/logo-spotify-org.svg" alt="Spotify Logo" />
      </div>
      <div class="btn-group">
        <button
          class="btn-type-0"
          :class="{ active: isSignUp }"
          @click="toggleForm(true)"
        >
          S I G N _ U P
        </button>
        <button
          class="btn-type-1"
          :class="{ active: !isSignUp }"
          @click="toggleForm(false)"
        >
          L O G _ I N
        </button>
      </div>
    </header>
    <div class="content">
      <!-- Форма входа -->
      <form v-if="!isSignUp" @submit.prevent="handleLogin">
        <h1>L O G _ I N</h1>
        <button type="button" class="alt-login">LOG IN WITH TELEGRAM</button>
        <div class="separator">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <div class="input-group">
          <input
            type="text"
            placeholder="Username or email"
            v-model="loginForm.email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            v-model="loginForm.password"
            required
          />
          <div class="checkbox-group">
            <label class="lable-checkbox" for="remember">
              <input
                class="checkbox"
                type="checkbox"
                v-model="loginForm.remember"
              />
            </label>
            <span>Remember me</span>
          </div>
        </div>
        <button type="submit" class="btn-type-1">L O G _ I N</button>
        <div class="form-footer">
          <span>Don't have an account? </span>
          <button type="button" class="link-btn" @click="toggleForm(true)">
            Sign up
          </button>
        </div>
      </form>

      <!-- Форма регистрации -->
      <form v-else @submit.prevent="handleSignUp">
        <h1>S I G N _ U P</h1>
        <button type="button" class="alt-login">SIGN UP WITH TELEGRAM</button>
        <div class="separator">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <div class="input-group">
          <input
            type="text"
            placeholder="Username"
            v-model="signUpForm.username"
            required
          />
          <input
            type="email"
            placeholder="Email"
            v-model="signUpForm.email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            v-model="signUpForm.password"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="signUpForm.confirmPassword"
            required
          />

          <div class="checkbox-group">
            <label class="lable-checkbox" for="terms">
              <input
                class="checkbox"
                type="checkbox"
                v-model="signUpForm.acceptTerms"
                required
              />
            </label>
            <span
              >I accept the
              <button type="button" class="link-btn">
                Terms and Conditions
              </button></span
            >
          </div>

          <div class="checkbox-group">
            <label class="lable-checkbox" for="newsletter">
              <input
                class="checkbox"
                type="checkbox"
                v-model="signUpForm.newsletter"
              />
            </label>
            <span>Send me news and offers</span>
          </div>
        </div>
        <button type="submit" class="btn-type-1">S I G N _ U P</button>
        <div class="form-footer">
          <span>Already have an account? </span>
          <button type="button" class="link-btn" @click="toggleForm(false)">
            Log in
          </button>
        </div>
      </form>
    </div>
    <div class="bgc-image">
      <img
        src="https://i.pinimg.com/originals/a8/0d/52/a80d52cbdcf9b14a4d45bd8bc85949b3.jpg"
        alt="Background"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/ composables/useAuth';
import { useUserStore } from '~/stores/user';
import axios from 'axios';

// Состояние для переключения между формами
const isSignUp = ref(false);
const isLoading = ref(false);
const error = ref(null);

// Данные формы входа
const loginForm = ref({
  email: "",
  password: "",
  remember: false,
});

// Данные формы регистрации
const signUpForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  newsletter: false,
});

// Функция переключения между формами
const toggleForm = (signUp) => {
  isSignUp.value = signUp;
};

const { login, getUserData } = useAuth();
const userStore = useUserStore();

// Обработчик входа
const handleLogin = async () => {
  isLoading.value = true;
  error.value = null;
  userStore.setError(null);
  
  try {
    // Логиним пользователя
    await login(loginForm.value.email, loginForm.value.password);
    await navigateTo('/');
    
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    error.value = errorMessage;
    userStore.setError(errorMessage);
  } finally {
    isLoading.value = false;
  }
};

// Обработчик регистрации
const handleSignUp = async () => {
  isLoading.value = true;
  error.value = null;

  if (signUpForm.value.password !== signUpForm.value.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!signUpForm.value.acceptTerms) {
    alert("Please accept the Terms and Conditions");
    return;
  }

  try {
    await axios.post('http://localhost:4000/auth/signup', {
        username: signUpForm.value.username,
        password: signUpForm.value.password,
        email: signUpForm.value.email
    })
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "Unknown error";
    }
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: "login",
});
</script>

<style scoped lang="scss">
@import "./styles/login.scss";
</style>
