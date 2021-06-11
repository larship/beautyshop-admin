import Client from '@/models/Client';
import { Config } from '@/config';

export function authClient(clientUuid: string, sessionId: string, salt: string): Promise<Client | null> {
  const data: FormData = new FormData();
  data.append('clientUuid', clientUuid);
  data.append('sessionId', sessionId);
  data.append('salt', salt);

  return fetch(Config.BACKEND_URL + '/client/auth', {
    method: 'POST',
    body: data,
  }).then(res => {
    if (!res.ok) {
      return null;
    }

    return res.json();
  }).then((json: Client) => {
    return json;
  });
}

export function authAdmin(phone: string, code: string): Promise<Client | null> {
  const data: FormData = new FormData();
  data.append('phone', phone);
  data.append('code', code);

  return fetch(Config.BACKEND_URL + '/admin/auth', {
    method: 'POST',
    body: data,
  }).then(res => {
    if (!res.ok) {
      return null;
    }

    return res.json();
  }).then((json: Client) => {
    return json;
  });
}

export function sendSecurityCode(phone: string): Promise<boolean> {
  const data: FormData = new FormData();
  data.append('phone', phone);

  return fetch(Config.BACKEND_URL + '/admin/send-security-code', {
    method: 'POST',
    body: data,
  }).then(res => {
    if (!res.ok) {
      return false;
    }

    return res.json();
  }).then((status: boolean) => {
    console.log('sendSecurityCode:', status);
    return status;
  });
}
