import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async create(user: CreateUserDto) {
    const newUser = new this.model({
      _id: new Types.ObjectId(),
      ...user,
    }).save();

    return (await newUser).toJSON();
  }

  async findOne(id: string) {
    return await this.model.findById(id).select('-password').lean<User>(true);
  }

  async findAll() {
    return await this.model.find().select('-password').lean<User[]>(true);
  }
}
