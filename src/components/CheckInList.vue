<template>
  <div class="check-in-list-screen">
    <select>
      <option>Сахар</option>
      <option>Место красоты</option>
    </select>
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
      <button @click="goToStatistics()">К статистике</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import CheckInItem from '@/models/CheckInItem';
import dayjs from 'dayjs';
import LocaleRu from 'dayjs/locale/ru';
import Utc from 'dayjs/plugin/utc';
import router from '@/router';

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

    onBeforeMount(async () => {
      await store.dispatch(ActionTypes.AuthorizeClient, {
        clientUuid: "a3c2e100-cd5f-4b41-91aa-34b1dd810020",
        sessionId: "181724eb5b80f7bca4e06ae0aad614fb21ee0c19b9dff36e57b130273e3e802d",
        salt: "5103997edea52b97c2845d58d88e4aeaa02ed32f412cbf3eb9aa686ec81b3cd3",
      });
    });

    const client = store.getters.getClient();

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

    const showCancelPopup = ref(false);
    const checkInUuidToCancel = ref('');

    const goToStatistics = () => {
      router.push({name: 'Statistics'});
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

    if (client) {
      store.dispatch(ActionTypes.GetBeautyshopList, {
        adminUuid: client.uuid
      });
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
