import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseEntity extends TypeOrmBaseEntity {
  @ApiProperty()
  @CreateDateColumn()
  @Field()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  @Field()
  updated_at: Date;
}
