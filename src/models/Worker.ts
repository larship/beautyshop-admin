import ServiceType from '@/models/ServiceType';

export default interface Worker {
  uuid: string;
  fullName: string;
  description: string;
  services: ServiceType[];
}
