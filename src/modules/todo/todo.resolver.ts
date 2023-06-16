import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { CreateTodoInput } from './inputs/create-todo.input';
import { UpdateTodoInput } from './inputs/update-todo.input';
import { RemoveTodoPayload } from './payloads/remove-todo.payload';
import { CategoryEntity } from '../category/category.entity';
import { CategoryService } from '../category/category.service';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => TodoEntity)
  private todo(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.todoService.getOne(id);
  }

  @Query(() => [TodoEntity])
  private todos() {
    return this.todoService.getMany();
  }

  @ResolveField(() => CategoryEntity)
  private category(@Parent() parent: TodoEntity) {
    return this.categoryService.getOne(parent.category_id);
  }

  @Mutation(() => TodoEntity)
  private createTodo(@Args('input') input: CreateTodoInput) {
    return this.todoService.create(input);
  }

  @Mutation(() => TodoEntity)
  private updateTodo(@Args('input') input: UpdateTodoInput) {
    return this.todoService.update(input.id, input);
  }

  @Mutation(() => RemoveTodoPayload)
  private removeTodo(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.todoService.remove(id);
  }
}
