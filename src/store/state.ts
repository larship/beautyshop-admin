import CheckInItem from '@/models/CheckInItem';
import Beautyshop from '@/models/Beautyshop';
import Client from '@/models/Client';

export type State = {
  loading: boolean;
  client: Client | null;
  checkInList: CheckInItem[] | null;
  beautyshopList: Beautyshop[] | null;
  currentBeautyshopUuid: string;
};

export const state: State = {
  loading: JSON.parse(localStorage.getItem('loading') ?? 'false') as boolean,
  client: JSON.parse(localStorage.getItem('client') ?? 'null') as Client,
  checkInList: [],
  beautyshopList: JSON.parse(localStorage.getItem('beautyshop-list') ?? '[]') as Beautyshop[],
  currentBeautyshopUuid: localStorage.getItem('current-beautyshop-uuid') ?? '',
};
