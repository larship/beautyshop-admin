<template>
  <div class="app-container">
    <header v-if="needShowHeader" v-bind:class="{ 'two-rows': needShowChangeChangeForm }">
      <span class="header--title">{{ routeTitle }}</span>
      <span v-if="needShowChangeChangeForm" class="header--change-beautyshop"
            v-on:click="isBeautyshopChangeFormShow = true">Изменить</span>
    </header>
    <BeautyshopChangeForm v-bind:is-open="isBeautyshopChangeFormShow"
                          @closed="isBeautyshopChangeFormShow = false"></BeautyshopChangeForm>
    <router-view/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '@/store';
import router from '@/router';
import { MutationType } from '@/store/mutations';
import BeautyshopChangeForm from '@/components/BeautyshopChangeForm.vue';

export default defineComponent({
  components: {BeautyshopChangeForm},
  setup() {
    const store = useStore();
    const needShowHeader = ref(false);
    const needShowChangeChangeForm = store.getters.getBeautyshopList()?.length ?? 0 > 1;
    const isBeautyshopChangeFormShow = ref(false);

    const getRouteTitle = () => {
      return store.getters.getCurrentBeautyshop()?.name;
    };

    const routeTitle = ref(getRouteTitle());

    watch(
        () => router.currentRoute.value,
        (value) => {
          needShowHeader.value = value.name != 'Hello';
        }
    );

    store.subscribe((mutation) => {
      if (mutation.type === MutationType.SetCurrentBeautyshop) {
        routeTitle.value = getRouteTitle();
      }
    });

    return {
      needShowHeader,
      routeTitle,
      needShowChangeChangeForm,
      isBeautyshopChangeFormShow,
    }
  }
})
</script>
