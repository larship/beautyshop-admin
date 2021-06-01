<template>
  <div class="screen-check-in-list">
    <div class="loading" v-if="isLoading">Загрузка...</div>
    <div class="checkin-list">
      <div v-for="checkInItem in checkInItemsList" v-bind:key="checkInItem.uuid" class="checkin-item">
        {{ checkInItem.beautyshop.name }}<br>
        {{ checkInItem.client.fullName }}<br>
        {{ checkInItem.client.phone }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc';
import router from '@/router';

export default defineComponent({
  props: ['uuid'],
  setup(props) {
    // Для тестов можно использовать UUID = '73b00c6d-a503-46b2-ae50-2bf609a82973'

    const store = useStore();
    const isLoading = computed(() => {
      return store.getters.getIsLoading();
    });
    const checkInItemsList = computed(() => {
      return store.getters.getBeautyshopCheckInList();
    });
    const goToStatistics = () => {
      router.push({name: 'Statistics', params: {uuid: props.uuid}});
    }

    dayjs.extend(Utc);

    // @TODO Вынести отсюда получение данных из сервера. Можно получать данные на каком-нибудь промежуточном экране,
    // а этот экран и экран статистики показывать уже когда всё полностью загрузится
    store.dispatch(ActionTypes.GetBeautyshopCheckInList, {
      beautyshopUuid: props.uuid,
      dateFrom: dayjs().startOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
      dateTo: dayjs().endOf('day').utc().format('YYYY-MM-DD HH:mm:ss'),
    });
    store.dispatch(ActionTypes.GetBeautyshopList, {
      location: 'Москва'
    });

    return {
      checkInItemsList,
      isLoading,
      goToStatistics,
    }
  }
})
</script>
