import { BaseEntity } from '../base/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MessageEntity } from '../message/message.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity('dialogs')
export class DialogEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column()
  public name: string;

  @Field(() => ID)
  @Column('uuid')
  @Index()
  public user_id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.dialog)
  public messages: MessageEntity[];
}
