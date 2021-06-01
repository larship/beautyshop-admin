<template>
  <nav>
    <a @click="goToList()">Список заявок</a> |
    <a @click="goToStatistics()">Статистика</a>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const goToList = () => {
      // const uuid = store.getters.getBeautyshop()?.uuid;
      const uuid = '73b00c6d-a503-46b2-ae50-2bf609a82973';

      if (!uuid) {
        console.log('NavBar: отсутствует uuid');
        return;
      }

      router.push({name: 'CheckInList', params: {uuid}});
    }
    const goToStatistics = () => {
      // const uuid = store.getters.getBeautyshop()?.uuid;
      const uuid = '73b00c6d-a503-46b2-ae50-2bf609a82973';

      if (!uuid) {
        console.log('NavBar: отсутствует uuid');
        return;
      }

      router.push({name: 'Statistics', params: {uuid}});
    }

    return {
      goToList,
      goToStatistics,
    }
  }
})
</script>
