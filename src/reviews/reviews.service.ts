import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create.review.dto';
import { Review } from './reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}

  public async createReiew(createReviewDto: CreateReviewDto) {
    const user = await this.usersService.findUserById(createReviewDto.userId);
    if (!user)
      throw new NotFoundException(`User ${createReviewDto.userId} not found`);
    const product = await this.productsService.findProductById(
      createReviewDto.productId,
    );
    if (!product)
      throw new NotFoundException(
        `Product ${createReviewDto.productId} not found`,
      );
    // const review = this.reviewsRepository.create(createReviewDto);
    const review = this.reviewsRepository.create({
      content: createReviewDto.content,
      rating: createReviewDto.rating,
      user, // assign the loaded entities
      product,
    });
    return await this.reviewsRepository.save(review);
  }

  public async getAllReviews() {
    return await this.reviewsRepository.find({
      relations: {
        user: true,
        product: true,
      },
    });
  }

  public async getReviewById(id: number) {
    const product = await this.reviewsRepository.find({
      where: { id: id },
      relations: {
        user: true,
        product: true,
      },
    });
    return product;
  }

  //   public async getReviewById(id: number) {
  //     return await this.reviewsRepository.findOneBy({ id });
  //   }
}
