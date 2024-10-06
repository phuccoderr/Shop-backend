import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { Customer } from 'src/customer/model/customer.schema';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private readonly model: Model<Customer>,
  ) {}

  async create(customer: CreateCustomerDto) {
    return await this.model.create({
      _id: new Types.ObjectId(),
      ...customer,
    });
  }
}
