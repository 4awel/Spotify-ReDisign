<template>
  <div>
    dasdasdasdasd
    {{ searchStore.$state.searchModalValue }}
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '~/stores/search';

const searchStore = useSearchStore();
</script>

<style>

</style>