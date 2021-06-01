import Beautyshop from '@/models/Beautyshop';
import { fetchDataList } from '@/api';

export function getBeautyshopList(city: string): Promise<Beautyshop[]> {
  return fetchDataList<Beautyshop>('/beautyshops?city=' + city).then((data: Beautyshop[] | null) => {
    if (!data) {
      return [];
    }

    let coordsStr;
    data.forEach(beautyshop => {
      if (beautyshop.coordinates) {
        coordsStr = beautyshop.coordinates as unknown as string;
        beautyshop.coordinates = coordsStr.replace(/[^0-9,.]/g, '').split(',').map(entry => Number(entry));
      }
    });

    return data;
  });
}
