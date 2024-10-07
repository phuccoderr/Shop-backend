import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone_number: string;

  @IsString()
  @IsIn(['male', 'female'])
  gender: string;

  @IsBoolean()
  status: boolean;
}
