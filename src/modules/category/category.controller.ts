import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  @ApiResponse({
    type: CategoryEntity,
  })
  private getCategory(@Param('id') id: string) {
    return this.categoryService.getOne(id, { todos: true });
  }

  @Get()
  @ApiResponse({
    type: CategoryEntity,
    isArray: true,
  })
  private getCategories() {
    return this.categoryService.getMany({ todos: true });
  }

  @Post()
  @ApiResponse({
    type: CategoryEntity,
  })
  private createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @Post()
  @ApiResponse({
    type: CategoryEntity,
  })
  private updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: DeleteCategoryDto,
  })
  private removeCategory(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
