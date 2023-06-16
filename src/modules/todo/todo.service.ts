import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    public readonly todoRepository: Repository<TodoEntity>,
  ) {}

  public getOne(id: string) {
    return this.todoRepository.findOneBy({ id });
  }

  public getMany() {
    return this.todoRepository.find();
  }

  public create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save({ ...createTodoDto });
  }

  public async update(id: string, updateTodoDto: UpdateTodoDto) {
    const result = await this.todoRepository
      .createQueryBuilder('todo')
      .update()
      .where({ id })
      .set({ ...updateTodoDto })
      .returning('*')
      .execute();

    return result.raw[0] as TodoEntity;
  }

  public async remove(id: string) {
    await this.todoRepository.delete({ id });
    return { id };
  }
}
