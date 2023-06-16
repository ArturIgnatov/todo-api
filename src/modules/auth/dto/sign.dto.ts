import { ApiProperty } from '@nestjs/swagger';

export class SignDto {
  @ApiProperty()
  public login: string;

  @ApiProperty()
  public password: string;
}
