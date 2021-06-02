<template>
  <div class="app-container">
    <header>
      <div class="header--title">
        <span>{{ routeTitle }}</span>
      </div>
    </header>
    <router-view/>
    <NavBar/>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { useStore } from '@/store';
import router from '@/router';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  components: {NavBar},
  setup() {
    const store = useStore();
    const currentRoute = computed(() => router.currentRoute.value);

    const getRouteTitle = (route: RouteLocationNormalizedLoaded) => {
      const beautyshop = store.getters.getBeautyshop(route.params.uuid as string);

      switch (route.name) {
        case 'CheckInList':
          return 'Список записей - ' + beautyshop?.name;

        case 'Statistics':
          return 'Статистика - ' + beautyshop?.name;
      }

      return '';
    };

    const routeTitle = ref(getRouteTitle(currentRoute.value));

    watch(
        currentRoute,
        (value) => {
          routeTitle.value = getRouteTitle(value);
        }
    );

    return {
      routeTitle,
    }
  }
})
</script>
