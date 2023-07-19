import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { Notificationsrepository } from '@/domain/notification/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements Notificationsrepository
{
  public items: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id
    );

    this.items[notificationIndex] = notification;
  }

  async create(notification: Notification): Promise<Notification> {
    this.items.push(notification);

    return notification;
  }
}
