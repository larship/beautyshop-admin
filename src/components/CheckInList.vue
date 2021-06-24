<template>
  <div class="check-in-list-screen">
    <div class="check-in-list--choose-interval">
      <input type="date"><span>&mdash;</span><input type="date">
    </div>
    <div class="check-in-list">
      <div v-for="checkInItem in checkInList" v-bind:key="checkInItem.uuid"
           v-bind:class="{ 'active': checkInItem.isActive, 'cancelled': checkInItem.isDeleted }" class="check-in-item">
        <div>
          {{ checkInItem.serviceTypeName }}<br>
          {{ checkInItem.workerName }}
        </div>
        <div class="check-in-item--price">
          {{ checkInItem.startDate }}<br>
          {{ checkInItem.price }} рублей
        </div>
        <button v-if="checkInItem.isActive" @click="cancelCheckIn(checkInItem.uuid, false)"
                class="check-in-item--cancel">X
        </button>
      </div>
    </div>
    <div class="buttons-container buttons-container__single">
      <button @click="goToStatistics()">К статистике</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import CheckInItem from '@/models/CheckInItem';
import dayjs from 'dayjs';
import LocaleRu from 'dayjs/locale/ru';
import Utc from 'dayjs/plugin/utc';
import router from '@/router';
import Beautyshop from '@/models/Beautyshop';
import { MutationType } from '@/store/mutations';

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
  setup() {
    dayjs.locale(LocaleRu);
    dayjs.extend(Utc);

    const store = useStore();
    const client = store.getters.getClient();
    const showCancelPopup = ref(false);
    const checkInUuidToCancel = ref('');
    const currentBeautyshop = ref<Beautyshop | null>(null);

    const checkInList = computed<CheckInViewItem[]>(() => {
      const list = store.getters.getCheckInList();

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

    const goToStatistics = () => {
      router.push({name: 'Statistics'});
    }

    const updateList = () => {
      const currentBeautyshop = store.getters.getCurrentBeautyshop();

      if (client && currentBeautyshop) {
        store.dispatch(ActionTypes.GetBeautyshopCheckInList, {
          beautyshopUuid: currentBeautyshop.uuid,
          dateFrom: dayjs().startOf('year').utc().format('YYYY-MM-DD HH:mm:ss'),
          dateTo: dayjs().endOf('year').utc().format('YYYY-MM-DD HH:mm:ss'),
        });
      }
    }

    if (client) {
      store.dispatch(ActionTypes.GetBeautyshopList, {
        adminUuid: client.uuid
      });
    }

    const cancelCheckIn = (checkInUuid: string, force: boolean) => {
      if (!force) {
        checkInUuidToCancel.value = checkInUuid;
        showCancelPopup.value = true;
      } else {
        // store.dispatch(ActionTypes.CancelCheckIn, {checkInUuid});
        updateList();
      }
    }

    const unsubscribe = store.subscribe((mutation) => {
      if (mutation.type === MutationType.SetCurrentBeautyshop || mutation.type === MutationType.SetBeautyshopList) {
        console.log('mutation.type', mutation.type);

        updateList();
      }
    });

    onUnmounted(() => {
      console.log('onDeactivated');
      unsubscribe();
    });

    return {
      checkInList,
      goToStatistics,
      cancelCheckIn,
      checkInUuidToCancel,
      showCancelPopup,
      currentBeautyshop,
    }
  }
})
</script>
