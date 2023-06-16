import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogEntity } from './dialog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DialogEntity])],
  exports: [DialogService],
  providers: [DialogService],
})
export class DialogModule {}
