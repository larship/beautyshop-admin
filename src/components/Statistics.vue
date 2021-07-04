<template>
  <div class="statistics-screen">
    <div class="statistics-control">
      <select>
        <option>Сегодня</option>
        <option>Вчера</option>
        <option>Неделя</option>
        <option>Месяц</option>
        <option>Всего</option>
      </select>
      <button @click="exportData()">-></button>
    </div>
    <div class="info-statistics">
      <div class="info-statistics--title">Общая информация</div>
      <div class="info-statistics--block">
        <div class="info-statistics--block-element">
          <span>123</span>
          <span>Человек записано</span>
        </div>
        <div class="info-statistics--block-element">
          <span>0 руб.</span>
          <span>Сумма услуг</span>
        </div>
      </div>
      <div v-for="worker in beautyshop?.workers" v-bind:key="worker.uuid" class="info-statistics--worker-block">
        <div class="info-statistics--title">{{ worker.fullName }}</div>
        <div class="info-statistics--block">
          <div class="info-statistics--block-element">
            <span>123</span>
            <span>Человек записано</span>
          </div>
          <div class="info-statistics--block-element">
            <span>0 руб.</span>
            <span>Сумма услуг</span>
          </div>
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
      router.push({name: 'CheckInList'});
    };
    const exportData = () => {
      console.log('Добавить экспортирование данных');
    }

    return {
      beautyshop,
      goToList,
      exportData
    }
  }
})
</script>
