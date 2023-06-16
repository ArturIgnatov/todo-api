import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('todos')
export class TodoEntity extends BaseEntity {
  @ApiProperty()
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column()
  title: string;

  @ApiProperty()
  @Field()
  @Column({ default: false })
  completed: boolean;

  @ApiProperty()
  @Index()
  @Field()
  @Column('uuid')
  category_id: string;

  @ApiProperty()
  @ManyToOne(() => CategoryEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
