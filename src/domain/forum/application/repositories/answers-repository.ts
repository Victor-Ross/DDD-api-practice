import { PaginationParams } from '@/core/repositories/Pagination-params';
import { Answer } from '../../enterprise/entities/answer';

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    params: PaginationParams,
    questionId: string
  ): Promise<Answer[]>;
  save(answer: Answer): Promise<void>;
  create(answer: Answer): Promise<Answer>;
  delete(answer: Answer): Promise<void>;
}
