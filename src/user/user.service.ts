import {
  Injectable,
  NotFoundException,
  Param,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.schema';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(user: CreateUserDto) {
    // mã hoá mật khẩu
    user.password = bcrypt.hashSync(user.password, 10);

    try {
      return await this.repository.create(user);
    } catch (error) {
      throw new UnprocessableEntityException('email đã tồn tại');
    }
  }

  getAll(param: ParamPaginationDto) {
    const { keyword, sort, page, limit } = param;

    const newSort = sort != 'asc' ? 'desc' : 'asc';
    const filter =
      keyword !== undefined
        ? {
            $or: [
              { name: new RegExp(keyword, 'i') },
              { email: new RegExp(keyword, 'i') },
            ],
          }
        : {};

    return this.repository.findAll(page, limit, newSort, filter);
  }

  async getOne(id: string) {
    try {
      return await this.repository.findOne(id, '-password');
    } catch (error) {
      throw new NotFoundException('Không tìm thấy user');
    }
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    try {
      return await this.repository.updateUser(id, updateUser);
    } catch (error) {
      throw new NotFoundException('Không tìm thấy user');
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.repository.deleteUser(id);
    } catch (error) {
      throw new NotFoundException('Không tìm thấy user');
    }
  }

  async updateStatusUser(id: string, status: boolean) {
    const user = await this.repository.updateStatusUser(id, status);
    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }
    return user;
  }
}
