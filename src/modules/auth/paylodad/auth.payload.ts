import { ApiProperty } from '@nestjs/swagger';

export class AuthPayload {
  @ApiProperty()
  public access_token: string;
}
