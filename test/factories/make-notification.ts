import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification';

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID('author-01'),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id
  );

  return notification;
}