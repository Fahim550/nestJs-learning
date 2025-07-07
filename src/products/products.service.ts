import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  public async createProduct(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  public async getAllProduct() {
    return await this.productsRepository.find({
      relations: {
        reviews: true,
      },
    });
  }

  public async findProductById(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
      relations: {
        reviews: true,
      },
    });
    return product;
  }
}
