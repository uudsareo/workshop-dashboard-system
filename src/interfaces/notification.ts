export interface INotification {
  _id: string;
  content: string;
  startOn: string; // ISO date string
  duration: number;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
