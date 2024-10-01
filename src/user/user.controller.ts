import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ParamPaginationDto } from 'src/user/dto/param-pagination.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/model/user.schema';
import { UserService } from 'src/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @Get()
  async getAllUsers(@Query() page: ParamPaginationDto) {
    const listUsers = await this.service.getAll(page);
    return this.buildPagination(listUsers, page);
  }

  @Put(':id')
  updateUser(@Param('id') _id: string, @Body() updateUser: UpdateUserDto) {
    return this.service.updateUser(_id, updateUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') _id: string) {
    await this.service.deleteUser(_id);

    return 'Xoá user thành công!';
  }

  @Get(':id')
  getUserById(@Param('id') _id: string) {
    return this.service.getOne(_id);
  }

  @Put(':id/status')
  updateStatusUser(@Param('id') _id: string, @Query('status') status: boolean) {
    return this.service.updateStatusUser(_id, status);
  }

  private buildPagination(listUsers: User[], param: ParamPaginationDto) {
    const { page, limit } = param;

    return {
      total_items: listUsers.length,
      total_pages: Math.ceil(listUsers.length / limit),
      current_page: parseInt(String(page)),
      entities: listUsers,
    };
  }
}
