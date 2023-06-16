import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => ID)
  category_id: string;

  @Field()
  title: string;
}
