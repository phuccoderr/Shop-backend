import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/model/user.schema';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  create(user: CreateUserDto) {
    // mã hoá mật khẩu
    user.password = bcrypt.hashSync(user.password, 10);

    return this.repository.create(user);
  }

  getAll() {
    return this.repository.findAll();
  }

  getOne(id: string) {
    return this.repository.findOne(id);
  }
}
