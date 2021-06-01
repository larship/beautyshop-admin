export default interface Client {
  uuid: string;
  phone: string;
  fullName: string;
  sessionId: string;
  salt: string;
}
