import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './database/database.module';
import { WssModule } from './wss/wss.module';
import { GqlModule } from './gql/gql.module';
import { DialogModule } from './modules/dialog/dialog.module';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TodoModule,
    CategoryModule,
    WssModule,
    GqlModule,
    DialogModule,
    MessageModule,
    UserModule,
    AuthModule,
    OpenaiModule,
  ],
})
export class AppModule {}
