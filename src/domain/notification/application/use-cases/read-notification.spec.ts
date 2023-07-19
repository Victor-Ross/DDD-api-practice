import { makeNotification } from 'test/factories/make-notification';
import { ReadNotificationUseCase } from './read-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory/in-memory-notifications-repository';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read notification use case', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able read a notification', async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-01'),
    });

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-02',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
