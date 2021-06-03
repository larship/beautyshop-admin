<template>
  <div class="screen-statistics">
    <div class="loading" v-if="isLoading">Загрузка...</div>
    <div class="statistics-container">
      <div class="info-statistics--title">Административная статистика<br>TODO Добавить возможность выгрузки статистики</div>
      <select>
        <option>Сегодня</option>
        <option>Вчера</option>
        <option>Неделя</option>
        <option>Месяц</option>
        <option>Всего</option>
      </select>
      <div class="info-statistics--block">
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  props: ['uuid'],
  setup() {
    const store = useStore();
    const beautyshop = computed(() => {
      return store.getters.getBeautyshop('73b00c6d-a503-46b2-ae50-2bf609a82973');
    });

    return {
      beautyshop
    }
  }
})
</script>
