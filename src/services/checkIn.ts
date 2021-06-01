import CheckInItem from '@/models/CheckInItem';
import { fetchDataList } from '@/api';

export async function getBeautyshopCheckInList(beautyshopUuid: string, dateFrom: string, dateTo: string): Promise<CheckInItem[] | null> {
  const params = new URLSearchParams({
    uuid: beautyshopUuid,
    dateFrom,
    dateTo

  });

  return await fetchDataList<CheckInItem>('/check-in/list-for-beautyshop?' + params.toString());
}
