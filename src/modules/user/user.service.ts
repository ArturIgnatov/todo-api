import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
  ) {}

  public builder(alias = 'user') {
    return this.userRepository.createQueryBuilder(alias);
  }

  public getOne(id: string) {
    return this.builder().select().where('user.id = :id', { id }).getOne();
  }

  public getMany() {
    return this.builder().getMany();
  }

  public async create(data: { login: string; password: string }) {
    const password = hashSync(data.password, 12);

    const result = await this.builder()
      .insert()
      .into(UserEntity)
      .values({ login: data.login, password })
      .returning('id')
      .execute();

    return result.raw[0] as { id: string };
  }
}
