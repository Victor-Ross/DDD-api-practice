import { Optional } from '@/core/types/optional';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { Comment, CommentProps } from './Comment';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return answerComment;
  }
}