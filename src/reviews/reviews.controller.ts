import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  public async createReview(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.createReiew(createReviewDto);
  }

  // public async createReview(createReviewDto: CreateReviewDto) {
  //   return await this.reviewsService.createReiew(createReviewDto);
  // }
  @Get()
  findAll() {
    return this.reviewsService.getAllReviews();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.getReviewById(+id);
  }
}
