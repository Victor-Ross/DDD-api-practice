import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { NotAllowedError } from '@/core/errors/not-allowed-error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-01'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-02',
    });

    expect(result.isLeft()).toEqual(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
