export interface IReminder {
  title: string;
  description: string;
  userID?: string;
  remindAt: string;
  color?: string;
  _id?: string;
  createdAt: string;
  notificado?: boolean;
  remindedAt?: string;
}
