import { Config } from '@/config';
import { useStore } from '@/store';

function getRequestHeaders(): Record<string, string> {
  const store = useStore();
  const client = store.getters.getClient();
  const retData: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (client) {
    retData['Auth-Client-Uuid'] = client.uuid;
    retData['Auth-Session-Id'] = client.sessionId;
    retData['Auth-Salt'] = client.salt;
  }

  return retData;
}

export function sendData<T>(url: string, data: Record<string, unknown>): Promise<T | null> {
  return fetch(Config.BACKEND_URL + url, {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) {
      return null;
    }

    return res.json();
  }).then((json: T) => {
    return json;
  });
}

export function fetchData<T>(url: string): Promise<T | null> {
  return fetch(Config.BACKEND_URL + url, {
    method: 'GET',
    headers: getRequestHeaders(),
  }).then(res => {
    if (!res.ok) {
      return null;
    }

    return res.json();
  }).then((json: T) => {
    return json;
  });
}

export function fetchDataList<T>(url: string): Promise<T[] | null> {
  return fetch(Config.BACKEND_URL + url, {
    method: 'GET',
    headers: getRequestHeaders(),
  }).then(res => {
    if (!res.ok) {
      return null;
    }

    return res.json();
  }).then((json: T[]) => {
    return json;
  });
}
