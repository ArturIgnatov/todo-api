import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  category_id: string;

  @ApiProperty()
  title: string;
}
