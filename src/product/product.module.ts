import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import {
  ProductImage,
  ProductImageSchema,
} from 'src/product/model/product-images.schema';
import { Product, ProductSchema } from 'src/product/model/product.schema';
import { ProductController } from 'src/product/product.controller';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductImage.name, schema: ProductImageSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
