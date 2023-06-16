import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveTodoPayload {
  @Field(() => ID)
  public id: string;
}
