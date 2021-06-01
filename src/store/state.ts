import CheckInItem from '@/models/CheckInItem';
import Beautyshop from '@/models/Beautyshop';
import Client from '@/models/Client';

export type State = {
  loading: boolean;
  client: Client | null;
  beautyshopCheckInList: CheckInItem[] | null;
  beautyshopList: Beautyshop[] | null;
};

export const state: State = {
  loading: JSON.parse(localStorage.getItem('loading') ?? 'false') as boolean,
  client: JSON.parse(localStorage.getItem('client') ?? 'null') as Client,
  beautyshopCheckInList: JSON.parse(localStorage.getItem('beautyshop-check-in-list') ?? '[]') as CheckInItem[],
  beautyshopList: JSON.parse(localStorage.getItem('beautyshop-list') ?? '[]') as Beautyshop[],
};
