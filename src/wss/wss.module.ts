import { Module } from '@nestjs/common';
import { DialogModule } from '../modules/dialog/dialog.module';
import { MessageModule } from '../modules/message/message.module';
import { WssGateway } from './wss.gateway';
import { OpenaiModule } from '../openai/openai.module';
import { TodoModule } from '../modules/todo/todo.module';

@Module({
  imports: [DialogModule, MessageModule, OpenaiModule, TodoModule],
  providers: [WssGateway],
})
export class WssModule {}
