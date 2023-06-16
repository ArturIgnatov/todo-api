import { BaseEntity } from '../base/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DialogEntity } from '../dialog/dialog.entity';

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ unique: true })
  public login: string;

  @Column({ select: false })
  public password: string;

  @OneToMany(() => DialogEntity, (dialog) => dialog.user)
  public dialogs: DialogEntity[];
}
