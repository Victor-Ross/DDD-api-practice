import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory/in-memory-notifications-repository';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send notification use case', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it('should be able send a notification', async () => {
    const result = await sut.execute({
      recipientId: 'author-01',
      title: 'Nova notificação',
      content: 'Melhorou 1% hoje!',
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification
    );
  });
});
