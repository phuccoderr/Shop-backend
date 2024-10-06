import { Module } from '@nestjs/common';
import { CustomerController } from 'src/customer/customer.controller';
import { CustomerRepository } from 'src/customer/customer.repository';
import { CustomerService } from 'src/customer/customer.service';
import { Customer, CustomerSchema } from 'src/customer/model/customer.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
