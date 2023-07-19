import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory/in-memory-questions-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory/in-memory-question-attachments-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe('Create question use case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-01',
      title: 'question-01',
      content: 'how can i be the best programmer in the world?',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question
    );
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('2'),
      }),
    ]);
  });
});
