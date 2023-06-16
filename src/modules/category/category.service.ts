import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository, FindOptionsRelations } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    public readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public getOne(id: string, relations?: FindOptionsRelations<CategoryEntity>) {
    return this.categoryRepository.findOne({ where: { id }, relations });
  }

  public async getMany(relations?: FindOptionsRelations<CategoryEntity>) {
    return this.categoryRepository.find({
      relations,
      order: { created_at: 'ASC' },
    });
  }

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save({ ...createCategoryDto });
  }

  public async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository
      .createQueryBuilder('category')
      .update()
      .where({ id })
      .set({ ...updateCategoryDto })
      .returning('*')
      .execute();

    return result.raw[0] as CategoryEntity;
  }

  public async remove(id: string) {
    await this.categoryRepository.delete({ id });
    return { id };
  }
}
