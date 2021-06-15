<template>
  <div class="check-in-list-screen">
    <select v-model="currentBeautyshop">
      <option v-for="beautyshop in beautyshopList" v-bind:key="beautyshop.uuid" v-bind:value="beautyshop">
        {{ beautyshop.name }}
      </option>
    </select>
    <input
        type="text"
        placeholder="(XXX) XXX-XX-XX"
        maxlength="15"
        value="Дата с дата по"
    />
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
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import CheckInItem from '@/models/CheckInItem';
import dayjs from 'dayjs';
import LocaleRu from 'dayjs/locale/ru';
import Utc from 'dayjs/plugin/utc';
import router from '@/router';
import Beautyshop from '@/models/Beautyshop';

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
    const beautyshopList = store.getters.getBeautyshopList(); // @todo Не показывать лист-бокс выбора, если салон только один
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
      if (client && currentBeautyshop.value) {
        store.dispatch(ActionTypes.GetBeautyshopCheckInList, {
          beautyshopUuid: currentBeautyshop.value.uuid,
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

    watch(
        currentBeautyshop,
        () => {
          store.dispatch(ActionTypes.SetCurrentBeautyshop, {
            beautyshop: currentBeautyshop.value
          });
          updateList();
        }
    );

    currentBeautyshop.value = beautyshopList ? beautyshopList[0] : null;

    return {
      checkInList,
      goToStatistics,
      cancelCheckIn,
      checkInUuidToCancel,
      showCancelPopup,
      beautyshopList,
      currentBeautyshop,
    }
  }
})
</script>
