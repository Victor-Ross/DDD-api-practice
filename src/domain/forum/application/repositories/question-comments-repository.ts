import { PaginationParams } from '@/core/repositories/Pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionCommentsRepository {
  findManyByQuestionId(
    id: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(questionComment: QuestionComment): Promise<void>;
  create(questionComment: QuestionComment): Promise<QuestionComment>;
}
