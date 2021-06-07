import { ActionContext, ActionTree } from 'vuex';
import { Mutations, MutationType } from './mutations';
import { State } from './state';
import { getBeautyshopCheckInList } from '@/services/checkIn';
import { getBeautyshopListByAdmin } from '@/services/beautyshop';
import Client from '@/models/Client';
import { authClient } from '@/services/auth';

export enum ActionTypes {
  AuthorizeClient = 'AUTHORIZE_CLIENT',
  GetBeautyshopCheckInList = 'GET_BEAUTYSHOP_CHECKIN_LIST',
  GetBeautyshopList = 'GET_BEAUTYSHOP_LIST',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

interface AuthorizeClientParams {
  clientUuid?: string;
  sessionId?: string;
  salt?: string;
}

interface GetBeautyshopCheckInListParams {
  beautyshopUuid: string;
  dateFrom: string;
  dateTo: string;
}

interface GetBeautyshopListParams {
  adminUuid: string;
}

export type Actions = {
  [ActionTypes.GetBeautyshopCheckInList](context: ActionAugments, data: GetBeautyshopCheckInListParams): void;
  [ActionTypes.GetBeautyshopList](context: ActionAugments, data: GetBeautyshopListParams): void;
  [ActionTypes.AuthorizeClient](context: ActionAugments, data: AuthorizeClientParams): Promise<Client | null>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.AuthorizeClient]({commit}, data: AuthorizeClientParams): Promise<Client | null> {
    if (!data?.clientUuid || !data?.sessionId || !data?.salt) {
      console.log('AuthorizeClient fail: недостаточно данных');
      return null;
    }

    const client = await authClient(data.clientUuid, data.sessionId, data.salt);
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
}
