<template>
  <div class="statistics-screen">
    <select>
      <option>Сегодня</option>
      <option>Вчера</option>
      <option>Неделя</option>
      <option>Месяц</option>
      <option>Всего</option>
    </select>
    <div class="info-statistics">
      <br>TODO Добавить возможность выгрузки статистики
      <div class="info-statistics--summary">
        <span>Всего записано человек</span><span>0</span>
        <span>Оплачено услуг на сумму</span><span>0 руб.</span>
      </div>
      <div class="info-statistics--workers-title">Сотрудники</div>
      <div v-for="worker in beautyshop?.workers" v-bind:key="worker.uuid" class="info-statistics--worker-block">
        <div>{{ worker.fullName }}</div>
        <div class="info-statistics--block">
          <span>Записано человек</span><span>0</span>
          <span>Оплачено услуг на сумму</span><span>0 руб.</span>
        </div>
      </div>
    </div>
    <div class="buttons-container buttons-container__single">
      <button @click="goToList()">К списку записей</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import router from '@/router';

export default defineComponent({
  props: ['uuid'],
  setup() {
    const store = useStore();
    const beautyshop = computed(() => {
      return store.getters.getCurrentBeautyshop();
    });
    const goToList = () => {
      router.push({name: 'CheckInList'/*, params: {uuid: '73b00c6d-a503-46b2-ae50-2bf609a82973'}*/});
    };

    return {
      beautyshop,
      goToList
    }
  }
})
</script>
