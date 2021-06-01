import BeautyshopWorker from '@/models/Worker';

export default interface Beautyshop {
  uuid: string;
  city: string;
  address: string;
  name: string;
  coordinates: number[] | null;
  openHour: number;
  closeHour: number;
  workers: BeautyshopWorker[];
  favorite: boolean;
  admins: string[];
}
