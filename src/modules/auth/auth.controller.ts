import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sign.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPayload } from './paylodad/auth.payload';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  @ApiResponse({
    type: AuthPayload,
  })
  private signIn(@Body() signDto: SignDto) {
    return this.authService.signIn(signDto);
  }

  @Post('/sign-up')
  @ApiResponse({
    type: AuthPayload,
  })
  public signUp(@Body() signDto: SignDto) {
    return this.authService.signUp(signDto);
  }
}
