import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DialogFiltersInput {
  @Field(() => ID, { nullable: true })
  public user_id: string;
}
