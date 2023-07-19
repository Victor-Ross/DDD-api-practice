import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory/in-memory-answer-attachments-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create answer use case', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );

    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: 'question-01',
      instructorId: 'instructor-01',
      content: 'Keep studying, and you will be!!!!',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toEqual(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]
    );
  });
});
