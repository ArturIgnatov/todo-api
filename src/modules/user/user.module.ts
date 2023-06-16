import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { DialogModule } from '../dialog/dialog.module';

@Module({
  imports: [DialogModule, TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
  providers: [UserService, UserResolver],
})
export class UserModule {}
