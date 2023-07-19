import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment';

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID('author-01'),
      content: faker.lorem.text(),
      answerId: new UniqueEntityID('answer-01'),
      ...override,
    },
    id
  );

  return answerComment;
}
