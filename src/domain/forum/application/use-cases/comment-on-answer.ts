import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const newAnswerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    const answerComment = await this.answerCommentsRepository.create(
      newAnswerComment
    );

    return right({
      answerComment,
    });
  }
}
