import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment';

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID('author-01'),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID('question-01'),
      ...override,
    },
    id
  );

  return questionComment;
}
