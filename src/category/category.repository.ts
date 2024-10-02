import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { Category } from 'src/category/model/category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    console.log('voo');
    return await new this.model({
      _id: new Types.ObjectId(),
      ...category,
    }).save();
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Category>(true);
  }

  async findAll() {
    return await this.model.find({}).populate('parent_id').lean<Category>(true);
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateOne(id: string, category: UpdateCategoryDto) {
    return await this.model.findOneAndUpdate({ _id: id }, category, {
      new: true,
    });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .lean<Category>(true);
  }
}
