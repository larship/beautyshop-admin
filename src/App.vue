<template>
  <div class="app-container">
    <header v-if="needShowHeader">
      <div class="header--title">
        <span>{{ routeTitle }}</span>
      </div>
    </header>
    <router-view/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { useStore } from '@/store';
import router from '@/router';
import { MutationType } from '@/store/mutations';

export default defineComponent({
  setup() {
    const store = useStore();
    const needShowHeader = ref(false);

    const getRouteTitle = (route: RouteLocationNormalizedLoaded) => {
      const beautyshop = store.getters.getCurrentBeautyshop();

      switch (route.name) {
        case 'CheckInList':
          return 'Список записей - ' + beautyshop?.name;

        case 'Statistics':
          return 'Статистика - ' + beautyshop?.name;
      }

      return '';
    };

    const routeTitle = ref(getRouteTitle(router.currentRoute.value));

    watch(
        () => router.currentRoute.value,
        (value) => {
          routeTitle.value = getRouteTitle(value);
          needShowHeader.value = value.name != 'Hello';
        }
    );

    store.subscribe((mutation) => {
      if (mutation.type === MutationType.SetCurrentBeautyshop) {
        routeTitle.value = getRouteTitle(router.currentRoute.value);
      }
    });

    return {
      needShowHeader,
      routeTitle,
    }
  }
})
</script>
