<template>
  <div class="popup-mask"></div>
  <div class="popup">
    <div class="popup--content">
      {{ title }}
    </div>
    <div class="popup--buttons" v-bind:class="{ 'popup--buttons__two-options': twoButtons }">
      <template v-if="twoButtons">
        <button @click="submit()">Да</button>
        <button @click="close()">Закрыть</button>
      </template>
      <template v-else>
        <button @click="close()">Хорошо</button>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['closePopup', 'submitPopup'],
  props: {
    'title': String,
    'twoButtons': Boolean
  },
  setup(props, {emit}) {
    const close = () => {
      emit('closePopup');
    }

    const submit = () => {
      emit('submitPopup');
    }

    return {
      close,
      submit,
    }
  }
})
</script>
