import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CloudinaryModule,
    CustomerModule,
  ],
})
export class AppModule {}
