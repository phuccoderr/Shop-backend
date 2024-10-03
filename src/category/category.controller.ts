import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.service.createCategory(category);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.service.updateById(id, category);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    return this.service.updateStatusById(id, status);
  }
}
