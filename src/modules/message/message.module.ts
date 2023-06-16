import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { MessageResolver } from './message.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  exports: [MessageService],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
