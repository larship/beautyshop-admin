<template>
<!--  <popup v-if="showCancelPopup" @submit-popup="showCancelPopup = false; cancelCheckIn(checkInUuidToCancel, true)"-->
<!--         @close-popup="showCancelPopup = false" title="Вы уверены, что хотите отменить запись?" two-buttons="true"></popup>-->
  <div class="check-in-list-screen">
    <div class="check-in-list">
      <div v-for="checkInItem in checkInList" v-bind:key="checkInItem.uuid"
           v-bind:class="{ 'active': checkInItem.isActive, 'cancelled': checkInItem.isDeleted }" class="check-in-item">
        <div>
          {{ checkInItem.beautyshopName }}<br>
          {{ checkInItem.serviceTypeName }} - {{ checkInItem.workerName }}
        </div>
        <div>
          {{ checkInItem.startDate }}<br>
          {{ checkInItem.price }} рублей
        </div>
        <button v-if="checkInItem.isActive" @click="cancelCheckIn(checkInItem.uuid, false)"
                class="check-in-item--cancel">X
        </button>
      </div>
    </div>
    <div class="buttons-container buttons-container__single">
      <button @click="goToStatistics()">Статистика</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import CheckInItem from '@/models/CheckInItem';
import dayjs from 'dayjs';
import LocaleRu from 'dayjs/locale/ru';
import Utc from 'dayjs/plugin/utc';
import router from '@/router';
// import Popup from '@/components/Popup.vue';

interface CheckInViewItem {
  uuid: string;
  beautyshopName: string;
  serviceTypeName: string;
  workerName: string;
  startDate: string;
  price: string;
  isDeleted: boolean;
  isActive: boolean;
}

export default defineComponent({
  // components: {Popup},
  setup() {
    dayjs.locale(LocaleRu);
    dayjs.extend(Utc);

    const store = useStore();
    const client = store.getters.getClient();
    const checkInList = computed<CheckInViewItem[]>(() => {
      let list = store.getters.getCheckInList();

      if (!list) {
        return [];
      }

      return list.map((checkInItem: CheckInItem) => {
        return {
          uuid: checkInItem.uuid,
          beautyshopName: checkInItem.beautyshop.name,
          serviceTypeName: checkInItem.serviceType.name,
          workerName: checkInItem.worker.fullName,
          startDate: dayjs(checkInItem.startDate).format('D MMMM, HH:mm'),
          price: checkInItem.price as unknown as string,
          isDeleted: checkInItem.deleted,
          isActive: dayjs(checkInItem.endDate).isAfter(dayjs()) && !checkInItem.deleted,
        };
      });
    });

    const showCancelPopup = ref(false);
    const checkInUuidToCancel = ref('');

    const goToStatistics = () => {
      router.push({name: 'Statistics', params: {uuid: '73b00c6d-a503-46b2-ae50-2bf609a82973'}});
    }

    const updateList = () => {
      if (client) {
        store.dispatch(ActionTypes.GetBeautyshopCheckInList, {
          beautyshopUuid: '73b00c6d-a503-46b2-ae50-2bf609a82973',
          dateFrom: dayjs().startOf('year').utc().format('YYYY-MM-DD HH:mm:ss'),
          dateTo: dayjs().endOf('year').utc().format('YYYY-MM-DD HH:mm:ss'),
        });
      }
    }

    updateList();

    const cancelCheckIn = (checkInUuid: string, force: boolean) => {
      if (!force) {
        checkInUuidToCancel.value = checkInUuid;
        showCancelPopup.value = true;
      } else {
        // store.dispatch(ActionTypes.CancelCheckIn, {checkInUuid});
        updateList();
      }
    }

    return {
      checkInList,
      goToStatistics,
      cancelCheckIn,
      checkInUuidToCancel,
      showCancelPopup,
    }
  }
})
</script>
