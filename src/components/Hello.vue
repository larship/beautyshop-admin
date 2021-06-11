<template>
  <div class="hello-screen">
    <popup v-if="showSecurityCodeErrorPopup" @close-popup="showSecurityCodeErrorPopup = false"
           title="Не удалось отправить код. Пожалуйста, попробуйте ещё раз." :two-buttons="false"></popup>
    <div v-if="currentShowState === ShowState.phone">
      <span class="input-title">Ваш телефон:</span>
      <div class="input-container input-container__two-rows">
        <span>+7</span>
        <input
            v-bind:value="phoneNumber"
            v-on:input="phoneNumber = $event.target.value"
            @input="phoneNumberChange()"
            type="text"
            placeholder="(XXX) XXX-XX-XX"
            maxlength="15"
        />
      </div>
      <span class="input-desc">
        Телефон нужен для авторизации, мы не используем его в рекламных целях.<br>
        На него будет отправлен проверочный код, который вам надо будет ввести на следующем шаге.
      </span>
      <button @click="nextStep()" v-bind:disabled="phoneNumber.length !== 15">Отправить код</button>
    </div>
    <div v-if="currentShowState === ShowState.code">
      <span class="input-title">На вам номер телефона был отправлен проверочный код. Пожалуйста, введите его в поле ниже:</span>
      <div class="input-container">
        <input
            v-bind:value="securityCode"
            v-on:input="securityCode = $event.target.value"
            type="text"
            maxlength="10"
        />
      </div>
      <button @click="nextStep()" v-bind:disabled="securityCode.length < 3">Войти</button>
    </div>
    <div class="user-agreement-info">
      Используя данное приложение, вы принимаете "Пользовательское соглашение"
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
import Client from '@/models/Client';
import { sendSecurityCode } from '@/services/auth';
import Popup from '@/components/Popup.vue';

enum ShowState {
  phone = 1,
  code = 2,
}

export default defineComponent({
  components: {Popup},
  setup() {
    const currentShowState = ref<ShowState>(ShowState.phone);
    const phoneNumber = ref('');
    const securityCode = ref('');
    const store = useStore();
    const showSecurityCodeErrorPopup = ref(false);

    const phoneNumberChange = () => {
      const phone = phoneNumber.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

      if (phone == null) {
        return;
      }

      phoneNumber.value = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] + (phone[3] ? '-' + phone[3] : '') + (phone[4] ? '-' + phone[4] : '');
    }

    const nextStep = () => {
      switch (currentShowState.value) {
        case ShowState.phone:
          sendSecurityCode('7' + phoneNumber.value.replace(/\D/g, '')).then((status: boolean) => {
            if (!status) {
              showSecurityCodeErrorPopup.value = true;
            } else {
              currentShowState.value = ShowState.code;
            }
          });
          break;

        case ShowState.code:
          store.dispatch(ActionTypes.AuthorizeAdmin, {
            phone: '7' + phoneNumber.value.replace(/\D/g, ''),
            code: securityCode.value
          }).then((client: Client | null) => {
            if (client) {
              router.push({name: 'CheckInList'});
              console.log('Администратор успешно авторизован, переходим в список заявок');
            } else {
              // @todo Показывать попап, что проверка кода не удалась
              console.log('Не удалось авторизовать администратора');
            }
          });

          break;
      }
    }

    // После успешной авторизации по коду на телефон - дальше авторизовываем по токену
    const client = store.getters.getClient();

    if (client?.uuid && client?.sessionId && client?.salt) {
      store.dispatch(ActionTypes.AuthorizeClient, {
        clientUuid: client.uuid,
        sessionId: client.sessionId,
        salt: client.salt,
      }).then((client: Client | null) => {
        if (client) {
          router.push({name: 'CheckInList'});
          console.log('Администратор успешно авторизован, переходим в список заявок');
        } else {
          console.log('Не удалось авторизовать администратора');
        }
      });
    }

    return {
      ShowState,
      currentShowState,
      phoneNumber,
      securityCode,
      phoneNumberChange,
      nextStep,
      showSecurityCodeErrorPopup,
    }
  }
})
</script>
