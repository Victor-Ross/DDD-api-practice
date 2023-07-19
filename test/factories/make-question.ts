import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID('author-01'),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
}
