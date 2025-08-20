export interface ITask {
  _id?: string;
  tag?: string;
  title: string;
  description: string;
  userID?: string;
  color: string;
  startDate?: string;
  endDate?: string;
  urgency?: string;
  isFinished?: boolean;
  createdAt?: Date;
}
