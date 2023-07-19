import { Notification } from '../../enterprise/entities/notification';

export interface Notificationsrepository {
  findById(id: string): Promise<Notification | null>;
  save(notification: Notification): Promise<void>;
  create(notification: Notification): Promise<Notification>;
}
