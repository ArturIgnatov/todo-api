import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { UpdateCategoryInput } from './inputs/update-category.input';
import { CreateCategoryInput } from './inputs/create-category.input';
import { RemoveCategoryPayload } from './payloads/remove-category.payload';
import { TodoEntity } from '../todo/todo.entity';
import { GraphqlLoader, Loader, LoaderData } from 'nestjs-graphql-tools';
import { TodoService } from '../todo/todo.service';
import { In } from 'typeorm';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly todoService: TodoService,
  ) {}

  @Query(() => CategoryEntity)
  private category(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.categoryService.getOne(id);
  }

  @Query(() => [CategoryEntity])
  private categories() {
    return this.categoryService.getMany();
  }

  @ResolveField(() => [TodoEntity])
  @GraphqlLoader()
  private async todos(@Loader() loader: LoaderData<TodoEntity, string>) {
    const todos = await this.todoService.todoRepository.find({
      where: {
        category_id: In(loader.ids),
      },
      order: { created_at: 'DESC' },
    });

    return loader.helpers.mapOneToManyRelation(
      todos,
      loader.ids,
      'category_id',
    );
  }

  @Mutation(() => CategoryEntity)
  private createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Mutation(() => CategoryEntity)
  private updateCategory(@Args('input') input: UpdateCategoryInput) {
    return this.categoryService.update(input.id, input);
  }

  @Mutation(() => RemoveCategoryPayload)
  private removeCategory(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.categoryService.remove(id);
  }
}
