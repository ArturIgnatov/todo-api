import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DialogEntity } from './dialog.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(DialogEntity)
    public readonly dialogRepository: Repository<DialogEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  public builder(alias = 'dialog') {
    return this.dialogRepository.createQueryBuilder(alias);
  }

  public async getOne(id: string) {
    return this.builder().select().where('dialog.id = :id', { id }).getOne();
  }

  public async getMany(filters?: { user_id?: string }) {
    this.dialogRepository.query(`
      SELECT
    `);
    const builder = this.builder();

    if (filters?.user_id) {
      builder.where('dialog.user_id = :user_id', { user_id: filters.user_id });
    }

    return builder.orderBy('dialog.created_at', 'ASC').getMany();
  }

  public async create(data: { name: string; user_id: string }) {
    const result = await this.dataSource.query<DialogEntity[]>(
      `INSERT INTO dialogs (name, user_id) VALUES ($1, $2) RETURNING *`,
      [data.name, data.user_id],
    );

    return result[0];
  }

  public async remove(id: string) {
    await this.builder().delete().from(DialogEntity).where({ id }).execute();
    return { id };
  }
}
