<template>
  <div class="beautyshop-change-form" v-if="isOpen">
    <div class="beautyshop-item" v-for="beautyshop in beautyshopList" v-bind:key="beautyshop.uuid"
         @click="selectBeautyshop(beautyshop)">
      {{ beautyshop.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import Beautyshop from '@/models/Beautyshop';

export default defineComponent({
  emits: ['closed'],
  props: ['isOpen'],
  setup(props, {emit}) {
    const store = useStore();
    const beautyshopList = store.getters.getBeautyshopList();

    const selectBeautyshop = (beautyshop: Beautyshop) => {
      store.dispatch(ActionTypes.SetCurrentBeautyshop, {
        beautyshop: beautyshop
      });
      emit('closed');
    }

    return {
      beautyshopList,
      selectBeautyshop,
    }
  }
})
</script>
