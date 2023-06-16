import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveCategoryPayload {
  @Field(() => ID)
  public id: string;
}
