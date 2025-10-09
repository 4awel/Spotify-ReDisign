<template>
  <div class="record-container">
    <div class="record-play-menu">
      <div class="action-group">
        <div
          v-if="isPlay"
          @click="toggleRecordPlay"
          class="svg-paly svg-record"
        >
          <img src="@/assets/svg/record/play.svg" alt="play" />
        </div>
        <div v-else @click="toggleRecordPlay" class="svg-stop svg-record">
          <img src="@/assets/svg/record/stop.svg" alt="stop" />
        </div>
        <div class="svg-prev svg">
          <img src="@/assets/svg/record/prev.svg" alt="prev" />
        </div>
        <div class="svg-next svg">
          <img src="@/assets/svg/record/next.svg" alt="next" />
        </div>
        <div
          class="svg-random svg"
          :class="{ active: isActiveRandom }"
          @click="isActiveRandom = !isActiveRandom"
        >
          <img src="@/assets/svg/record/random.svg" alt="random" />
        </div>
        <div
          class="svg-repeat svg"
          :class="{ active: isActiveRepeat }"
          @click="isActiveRepeat = !isActiveRepeat"
        >
          <img src="@/assets/svg/record/repeat.svg" alt="repeat" />
        </div>
        <div class="record-play">
          <span class="time-current">2:20</span>
          <div class="progress-container">
            <input
              type="range"
              name="record-play"
              id="record-play"
              class="progress-bar"
              min="0"
              max="100"
              value="50"
            />
          </div>
          <span class="time-all">4:32</span>
        </div>
        <div class="svg-sound svg">
          <img src="@/assets/svg/record/sound.svg" alt="sound" />
        </div>
      </div>
    </div>
    <div class="current-track">
      <div class="cover-track">
        <img
          src="https://images.genius.com/db6ec46903dfca2f765cc60ec0d7c283.1000x1000x1.png"
          alt="cover"
        />
      </div>
      <div class="description-track">
        <h4 class="title">Тонированый жигуль</h4>
        <span class="executor">5opka, MellSher</span>
        <span class="album-executors">SUPER PUPER NOVA</span>
      </div>
    </div>
    <div class="record-settings">
      <div class="group-btn">
        <div v-if="isLike" @click="toggleLike" class="svg-like-low svg">
          <img src="@/assets/svg/record/like-low.svg" alt="like-low" />
        </div>
        <div v-else @click="toggleLike" class="svg-like-full svg">
          <img src="@/assets/svg/record/like-full.svg" alt="like-full" />
        </div>
        <div class="svg-addplaylist svg">
          <img src="@/assets/svg/record/addplaylist.svg" alt="addplaylist" />
        </div>
        <div class="svg-lirics svg">
          <img src="@/assets/svg/record/lirics.svg" alt="lirics" />
        </div>
        <div class="svg-devices svg">
          <img src="@/assets/svg/record/devices.svg" alt="devices" />
        </div>
        <div class="svg-menu svg">
          <img src="@/assets/svg/record/menu.svg" alt="menu" />
        </div>
      </div>
      <hr class="vertical-hr" />
      <div class="group-queue">
        <div class="svg-dj svg">
          <img src="@/assets/svg/record/dj.svg" alt="dj" />
        </div>
        <div class="svg-queue svg">
          <img src="@/assets/svg/record/queue.svg" alt="queue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";


export default defineComponent({
  setup() {
    const isPlay = ref(false);
    const isLike = ref(false);
    const isOpenSoundMenu = ref(false);
    const isActiveRepeat = ref(false);
    const isActiveRandom = ref(false);

    const toggleRecordPlay = () => {
      isPlay.value = !isPlay.value;
    };

    const toggleLike = () => {
      isLike.value = !isLike.value;
    };

    return {
      isPlay,
      toggleRecordPlay,
      isLike,
      toggleLike,
      isActiveRepeat,
      isActiveRandom,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../layout/styles/Record.scss';
</style>
