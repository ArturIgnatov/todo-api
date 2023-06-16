import { Args, Query, Resolver } from '@nestjs/graphql';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => MessageEntity)
  public message(@Args('id') id: string) {
    return this.messageService.getOne(id);
  }
}
