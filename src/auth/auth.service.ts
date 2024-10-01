import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async generateToken(login: LoginDto) {
    const { email, password } = login;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }

    if (user.status === false) {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const body = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.signAsync(body);
  }
}
