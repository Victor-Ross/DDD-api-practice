import { Optional } from '@/core/types/optional';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { Comment, CommentProps } from './Comment';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return questionComment;
  }
}
