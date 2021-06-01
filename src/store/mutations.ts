import { MutationTree } from 'vuex'
import { State } from './state'
import CheckInItem from '@/models/CheckInItem';
import Beautyshop from '@/models/Beautyshop';
import Client from '@/models/Client';

export enum MutationType {
  SetClient = 'SET_CLIENT',
  SetLoading = 'SET_LOADING',
  SetBeautyshopList = 'SET_BEAUTYSHOP_LIST',
  SetBeautyshopCheckInList = 'SET_BEAUTYSHOP_CHECKIN_LIST',
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetClient](state: State, client: Client | null): void;
  [MutationType.SetBeautyshopList](state: State, list: Beautyshop[] | null): void;
  [MutationType.SetBeautyshopCheckInList](state: State, list: CheckInItem[] | null): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
    localStorage.setItem('loading', JSON.stringify(value));
  },

  [MutationType.SetClient](state, value) {
    state.client = value;
    localStorage.setItem('client', JSON.stringify(state.client));
  },

  [MutationType.SetBeautyshopList](state, value) {
    state.beautyshopList = value;
    localStorage.setItem('beautyshop-list', JSON.stringify(state.beautyshopList));
  },

  [MutationType.SetBeautyshopCheckInList](state, value) {
    state.beautyshopCheckInList = value;
    localStorage.setItem('beautyshop-check-in-list', JSON.stringify(value));
  },
}
