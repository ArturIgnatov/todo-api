import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(data: { login: string; password: string }) {
    const is_user_exist = await this.userService.userRepository
      .createQueryBuilder('user')
      .select(['id'])
      .where('user.login = :login', { login: data.login })
      .getExists();

    if (is_user_exist) {
      throw new HttpException('USER_ALREADY_EXIST', 403);
    }

    const user = await this.userService.create(data);

    const access_token = this.jwtService.sign({
      id: user.id,
    });

    return { access_token };
  }

  public async signIn(data: { login: string; password: string }) {
    const user = await this.userService.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login: data.login })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const is_valid_password = await compare(data.password, user.password);

    if (!is_valid_password) {
      throw new HttpException('BAD_CREDENTIAL', 401);
    }

    const access_token = this.jwtService.sign({
      id: user.id,
    });

    return { access_token };
  }
}
