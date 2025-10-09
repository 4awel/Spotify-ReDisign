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
          />
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
import { defineComponent, ref } from "vue";

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
}

interface ActionType {
  image: string;
}

export default defineComponent({
  setup() {
    const activeButton = ref(0);
    const searchQuery = ref('');
    const isProfileMenuOpen = ref(false);

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
      {
        image: headerAction0,
      },
      {
        image: headerAction1,
      },
      {
        image: headerAction2,
      },
      {
        image: headerAction3,
      },
    ] as ActionType[];

    const setActiveButton = (index: number) => {
      activeButton.value = index;
      // Здесь можно добавить логику навигации
    };

    const handleAction = (index: number) => {
      // Обработка действий (уведомления, настройки и т.д.)
      console.log('Action clicked:', index);
    };

    const toggleProfileMenu = () => {
      isProfileMenuOpen.value = !isProfileMenuOpen.value;
    };

    return {
      btnRoute,
      groupAction,
      activeButton,
      searchQuery,
      isProfileMenuOpen,
      setActiveButton,
      handleAction,
      toggleProfileMenu
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #000000;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__left {
  display: flex;
  align-items: center;
  flex: 1;
}

.nav {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__button {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  background: none;
  border: none;
  color: #B3B3B3;
  font-family: 'CircularStdMedium', sans-serif;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  padding: 16px 20px;
  width: 200px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.nav__button:hover {
  color: #FFFFFF;
  transform: translateY(-1px);
}

.nav__button--active {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

.nav__icon {
  width: 20px;
  height: 20px;
  filter: brightness(0.8);
}

.nav__button--active .nav__icon {
  filter: brightness(1);
}

.nav__text {
  white-space: nowrap;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  background: #000000;
  color: #FFFFFF;
  border-radius: 12px;
  padding: 16px 20px;
  min-width: 400px;
  transition: all 0.2s ease;
}

.search:focus-within {
  box-shadow: 0 0 0 2px #1ED760;
}

.search__label {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.search__icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search__input {
  border: none;
  outline: none;
  background: none;
  font-family: 'Circular Std', sans-serif;
  font-size: 16px;
  color: #FFFFFF;
  width: 100%;
}

.search__input::placeholder {
  color: #535353;
}

.header__right {
  display: flex;
  align-items: center;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.actions__button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions__button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.actions__icon {
  width: 30px;
  height: 30px;
  filter: brightness(0.8);
}

.actions__button:hover .actions__icon {
  filter: brightness(1);
}

.avatar {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  margin-left: 8px;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatar__image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1ED760; /* Заглушка для аватара */
  border: 2px solid #FFFFFF;
}

/* Адаптивность */
@media (max-width: 768px) {
  .header {
    padding: 16px 20px;
  }
  
  .nav {
    gap: 16px;
  }
  
  .nav__text {
    display: none;
  }
  
  .search {
    min-width: 200px;
  }
  
  .actions {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .search {
    min-width: 150px;
  }
  
  .actions__button:nth-child(-n+2) {
    display: none;
  }
}
</style>