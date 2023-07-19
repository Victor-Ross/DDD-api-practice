import { InMemoryAnswersRepository } from 'test/repositories/in-memory/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory/in-memory-questions-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-question';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory/in-memory-question-attachments-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory/in-memory-answer-attachments-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose question best answer use case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id
    );
  });

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-01'),
    });
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-02',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
