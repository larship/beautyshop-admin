import { GetterTree } from 'vuex';
import { State } from './state';
import CheckInItem from '@/models/CheckInItem';
import Beautyshop from '@/models/Beautyshop';
import Client from '@/models/Client';

export type Getters = {
  getIsLoading(state: State): () => boolean;
  getClient(state: State): () => Client | null;
  getCheckInList(state: State): () => CheckInItem[] | null;
  getBeautyshopList(state: State): () => Beautyshop[] | null;
  getCurrentBeautyshop(state: State): () => Beautyshop | null;
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

  getCurrentBeautyshop: (state: State) => () => {
    const beautyshopListFiltered = state.beautyshopList?.filter((beautyshop: Beautyshop) => {
      return beautyshop.uuid === state.currentBeautyshopUuid;
    });
    const beautyshop = beautyshopListFiltered?.[0];

    return beautyshop || null;
  },

  getCheckInList: (state: State) => () => {
    return state.checkInList;
  },
}
