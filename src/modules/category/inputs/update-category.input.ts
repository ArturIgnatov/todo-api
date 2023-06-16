import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  public id: string;

  @Field()
  public name: string;
}
