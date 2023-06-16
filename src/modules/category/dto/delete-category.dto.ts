import { ApiProperty } from '@nestjs/swagger';

export class DeleteCategoryDto {
  @ApiProperty()
  public id: string;
}
