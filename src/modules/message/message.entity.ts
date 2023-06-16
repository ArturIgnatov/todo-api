import { BaseEntity } from '../base/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageRole } from '../../interfaces/message-role';
import { DialogEntity } from '../dialog/dialog.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('messages')
export class MessageEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field(() => MessageRole)
  @Column({ enum: MessageRole, default: MessageRole.USER })
  public role: MessageRole;

  @Field()
  @Column()
  public content: string;

  @Field(() => ID)
  @Index()
  @Column('uuid')
  public dialog_id: string;

  @ManyToOne(() => DialogEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dialog_id' })
  public dialog: DialogEntity;
}
