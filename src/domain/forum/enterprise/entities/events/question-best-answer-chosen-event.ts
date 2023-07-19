import { DomainEvent } from '@/core/events/domain-event';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import { Question } from '../question';

export class QuestionBestQuestionChosenEvent implements DomainEvent {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityID;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id;
  }
}