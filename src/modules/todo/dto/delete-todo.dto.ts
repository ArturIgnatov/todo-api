import { ApiProperty } from '@nestjs/swagger';

export class DeleteTodoDto {
  @ApiProperty()
  id: string;
}
