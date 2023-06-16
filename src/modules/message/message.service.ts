import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRole } from '../../interfaces/message-role';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    public readonly messageRepository: Repository<MessageEntity>,
  ) {}

  public getOne(id: string) {
    return this.messageRepository
      .createQueryBuilder('message')
      .select()
      .where('message.id = :id', { id })
      .getOne();
  }

  public getMany(filters?: { dialog_id?: string }) {
    const builder = this.messageRepository.createQueryBuilder('message');

    if (filters.dialog_id) {
      builder.where('message.dialog_id = :dialog_id', {
        dialog_id: filters.dialog_id,
      });
    }

    return builder.orderBy('message.created_at', 'ASC').getMany();
  }

  public async create(data: {
    content: string;
    role: MessageRole;
    dialog_id: string;
  }) {
    const operation = await this.messageRepository
      .createQueryBuilder()
      .insert()
      .into(MessageEntity)
      .values({ ...data })
      .returning('*')
      .execute();

    return operation.raw[0] as MessageEntity;
  }

  public async remove(id: string) {
    await this.messageRepository.delete({ id });
    return { id };
  }
}
