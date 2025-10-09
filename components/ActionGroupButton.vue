<template>
  <div class="action-group">
    <!-- Кнопка "Назад" -->
    <div
      @click="currentClick(0)"
      :class="{ 'disable-button': isLeftDisabled }"
      class="actio-svg arrow-left"
      :disabled="isLeftDisabled"
    >
      <img
        style="transform: rotate(180deg)"
        src="../assets/svg/homePage/arrow.svg"
        alt="arrow-left"
      />
    </div>
    
    <!-- Кнопка "Вперед" -->
    <div
      @click="currentClick(1)"
      :class="{ 'disable-button': isRightDisabled }"
      class="actio-svg arrow-right"
      :disabled="isRightDisabled"
    >
      <img src="../assets/svg/homePage/arrow.svg" alt="arrow-right" />
    </div>
    
    <div class="actio-svg menu">
      <img src="../assets/svg/record/menu.svg" alt="menu" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Emits {
  (e: "selected-clicked-fst", value: number): void;
  (e: "selected-clicked-sec", value: number): void;
  (e: "selected-clicked-thrd", value: number): void;
}

interface Props {
  optionFst?: boolean[];
  optionSec?: boolean[];
  optionThrd?: boolean[];
}

const props = withDefaults(defineProps<Props>(), {
  optionFst: () => [],
  optionSec: () => [],
  optionThrd: () => [],
});

const emit = defineEmits<Emits>();

// Вычисляемые свойства для каждой кнопки
const isLeftDisabled = computed(() => {
  if (props.optionFst.length > 0) {
    return props.optionFst[0];
  } else if (props.optionSec.length > 0) {
    return props.optionSec[0];
  } else if (props.optionThrd.length > 0) {
    return props.optionThrd[0];
  }
  return false;
});

const isRightDisabled = computed(() => {
  if (props.optionFst.length > 0) {
    return props.optionFst[1];
  } else if (props.optionSec.length > 0) {
    return props.optionSec[1];
  } else if (props.optionThrd.length > 0) {
    return props.optionThrd[1];
  }
  return false;
});

const currentClick = (event: number) => {
  // Prevent click if disabled
  if ((event === 0 && isLeftDisabled.value) || (event === 1 && isRightDisabled.value)) {
    return;
  }
  
  // Определяем, какой блок активен
  if (props.optionFst.length > 0) {
    emit("selected-clicked-fst", event);
  } else if (props.optionSec.length > 0) {
    emit("selected-clicked-sec", event);
  } else if (props.optionThrd.length > 0) {
    emit("selected-clicked-thrd", event);
  }
};
</script>

<style scoped>
/* Стили остаются такими же */
.action-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 30px;
}

.arrow-right img,
.arrow-left img {
  display: flex;
  cursor: pointer;
  width: 16px;
  height: 16px;
  transition: all 0.3s ease;
}

.arrow-right:not(.disable-button) img:hover {
  transform: translateX(10px);
}

.arrow-left:not(.disable-button) img:hover {
  transform: translateX(-10px);
}

.menu {
  width: 50px;
  cursor: pointer;
  display: flex;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.disable-button {
  filter: brightness(30%) saturate(100%) invert(16%) sepia(0%) saturate(0%)
    hue-rotate(0deg) brightness(90%) contrast(100%);
  cursor: not-allowed;
}

.disable-button img:hover {
  transform: none !important;
}

.menu:hover {
  background-color: #ffffff22;
  transform: translateY(-5px);
}
</style>