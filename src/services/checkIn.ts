import CheckInItem from '@/models/CheckInItem';
import { fetchDataList, sendData } from '@/api';

export async function getBeautyshopCheckInList(beautyshopUuid: string, dateFrom: string, dateTo: string): Promise<CheckInItem[] | null> {
  const params = new URLSearchParams({
    uuid: beautyshopUuid,
    dateFrom,
    dateTo

  });

  return await fetchDataList<CheckInItem>('/check-in/list-for-beautyshop?' + params.toString());
}

export async function cancelCheckIn(uuid: string): Promise<boolean | null> {
  return await sendData<boolean>('/check-in/cancel', {
    uuid
  });
}
