import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @ApiProperty()
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column()
  name: string;

  @ApiProperty({ type: () => [TodoEntity] })
  @OneToMany(() => TodoEntity, (todo) => todo.category)
  todos: TodoEntity[];
}
