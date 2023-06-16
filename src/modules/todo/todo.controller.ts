import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  @ApiResponse({
    type: TodoEntity,
  })
  private getTodo(@Param('id') id: string) {
    return this.todoService.getOne(id);
  }

  @Get()
  @ApiResponse({
    type: TodoEntity,
    isArray: true,
  })
  private getMany() {
    return this.todoService.getMany();
  }

  @Post()
  @ApiResponse({
    type: TodoEntity,
  })
  private createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id')
  @ApiResponse({
    type: TodoEntity,
  })
  private updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: DeleteTodoDto,
  })
  private removeTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
