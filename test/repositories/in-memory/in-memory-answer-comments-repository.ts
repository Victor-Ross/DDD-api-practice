import { PaginationParams } from '@/core/repositories/Pagination-params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findManyByAnswerId(
    id: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }
  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.items.findIndex(
      (item) => item === answerComment
    );

    this.items.splice(answerCommentIndex, 1);
  }

  async create(answerComment: AnswerComment): Promise<AnswerComment> {
    this.items.push(answerComment);

    return answerComment;
  }
}
