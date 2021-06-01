import { GetterTree } from 'vuex';
import { State } from './state';
import CheckInItem from '@/models/CheckInItem';
import Beautyshop from '@/models/Beautyshop';
import Client from '@/models/Client';

export type Getters = {
  getIsLoading(state: State): () => boolean;
  getClient(state: State): () => Client | null;
  getBeautyshopCheckInList(state: State): () => CheckInItem[] | null;
  getBeautyshopList(state: State): () => Beautyshop[] | null;
  getBeautyshop(state: State): (uuid: string) => Beautyshop | null;
}

export const getters: GetterTree<State, State> & Getters = {
  getClient: (state: State) => () => {
    return state.client;
  },

  getIsLoading: (state: State) => () => {
    return state.loading;
  },

  getBeautyshopList: (state: State) => () => {
    return state.beautyshopList;
  },

  getBeautyshop: (state: State) => (uuid: string) => {
    const beautyshopListFiltered = state.beautyshopList?.filter((beautyshop: Beautyshop) => {
      return beautyshop.uuid === uuid;
    });
    const beautyshop = beautyshopListFiltered?.[0];

    return beautyshop || null;
  },

  getBeautyshopCheckInList: (state: State) => () => {
    return state.beautyshopCheckInList;
  },
}
