import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDialogInput {
  @Field(() => ID)
  public user_id: string;

  @Field()
  public name: string;
}
