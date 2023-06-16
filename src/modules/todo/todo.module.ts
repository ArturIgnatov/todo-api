import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    forwardRef(() => CategoryModule),
  ],
  providers: [TodoService, TodoResolver],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
