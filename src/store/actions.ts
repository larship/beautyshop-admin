import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationType } from './mutations';
import { State } from './state';
import { cancelCheckIn, getBeautyshopCheckInList } from '@/services/checkIn';
import { getBeautyshopListByAdmin } from '@/services/beautyshop';
import Client from '@/models/Client';
import { authAdmin, authClient } from '@/services/auth';
import Beautyshop from '@/models/Beautyshop';

export enum ActionTypes {
  AuthorizeClient = 'AUTHORIZE_CLIENT',
  AuthorizeAdmin = 'AUTHORIZE_ADMIN',
  GetBeautyshopCheckInList = 'GET_BEAUTYSHOP_CHECKIN_LIST',
  GetBeautyshopList = 'GET_BEAUTYSHOP_LIST',
  SetCurrentBeautyshop = 'SET_CURRENT_BEAUTYSHOP',
  CancelCheckIn = 'CANCEL_CHECK_IN',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

interface AuthorizeClientParams {
  clientUuid: string;
  sessionId: string;
  salt: string;
}

interface AuthorizeAdminParams {
  phone: string;
  code: string;
}

interface GetBeautyshopCheckInListParams {
  beautyshopUuid: string;
  dateFrom: string;
  dateTo: string;
}

interface GetBeautyshopListParams {
  adminUuid: string;
}

interface SetCurrentBeautyshopParams {
  beautyshop: Beautyshop | null;
}

interface CancelCheckInParams {
  checkInUuid: string;
}

export type Actions = {
  [ActionTypes.AuthorizeClient](context: ActionAugments, data: AuthorizeClientParams): Promise<Client | null>;
  [ActionTypes.AuthorizeAdmin](context: ActionAugments, data: AuthorizeAdminParams): Promise<Client | null>;
  [ActionTypes.GetBeautyshopCheckInList](context: ActionAugments, data: GetBeautyshopCheckInListParams): void;
  [ActionTypes.GetBeautyshopList](context: ActionAugments, data: GetBeautyshopListParams): void;
  [ActionTypes.SetCurrentBeautyshop](context: ActionAugments, data: SetCurrentBeautyshopParams): void;
  [ActionTypes.CancelCheckIn](context: ActionAugments, data: CancelCheckInParams): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.AuthorizeClient]({commit}, data: AuthorizeClientParams): Promise<Client | null> {
    const client = await authClient(data.clientUuid, data.sessionId, data.salt);
    commit(MutationType.SetClient, client);
    return client;
  },

  async [ActionTypes.AuthorizeAdmin]({commit}, data: AuthorizeAdminParams): Promise<Client | null> {
    const client = await authAdmin(data.phone, data.code);
    commit(MutationType.SetClient, client);
    return client;
  },

  async [ActionTypes.GetBeautyshopCheckInList]({commit}, data: GetBeautyshopCheckInListParams) {
    commit(MutationType.SetLoading, true);

    const checkInList = await getBeautyshopCheckInList(data.beautyshopUuid, data.dateFrom, data.dateTo);
    commit(MutationType.SetCheckInList, checkInList);

    commit(MutationType.SetLoading, false);
  },

  async [ActionTypes.GetBeautyshopList]({commit}, data: GetBeautyshopListParams) {
    commit(MutationType.SetLoading, true);

    const beautyshops = await getBeautyshopListByAdmin(data.adminUuid);
    commit(MutationType.SetBeautyshopList, beautyshops);

    commit(MutationType.SetLoading, false);
  },

  async [ActionTypes.SetCurrentBeautyshop]({commit}, data: SetCurrentBeautyshopParams) {
    commit(MutationType.SetCurrentBeautyshop, data.beautyshop);
  },

  async [ActionTypes.CancelCheckIn]({commit}, data: CancelCheckInParams) {
    commit(MutationType.SetLoading, true);

    cancelCheckIn(data.checkInUuid);

    commit(MutationType.SetLoading, false);
  },
}
