import Beautyshop from '@/models/Beautyshop';
import Client from '@/models/Client';
import Worker from '@/models/Worker';
import ServiceType from '@/models/ServiceType';

export default interface CheckInItem {
  uuid: string;
  beautyshop: Beautyshop;
  client: Client;
  worker: Worker;
  serviceType: ServiceType;
  startDate: Date;
  endDate: Date;
  createdTime: Date;
  price: number;
}
