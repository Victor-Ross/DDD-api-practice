import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory/in-memory-question-comments-repository';
import { FetchQuestionCommentsUseCase } from './fetch-question-comments';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { makeQuestionComment } from 'test/factories/make-question-comment';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch question comments use case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-01') })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-01') })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('question-01') })
    );

    const result = await sut.execute({
      page: 1,
      questionId: 'question-01',
    });

    expect(result.value?.questionComments).toHaveLength(3);
  });

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('question-01') })
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-01',
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
