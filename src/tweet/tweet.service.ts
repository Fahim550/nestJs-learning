import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  public async getTweets() {
    return await this.tweetRepository.find({
      relations: {
        user: true,
      },
    });
  }

  public async getTweetById(id: number) {
    const tweet = await this.tweetRepository.find({
      where: { user: { id: id } },
      relations: {
        user: true,
      },
    });
    return tweet;
  }

  public async create(createTweetDto: CreateTweetDto) {
    const user = await this.userService.findUserById(createTweetDto.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const tweet = this.tweetRepository.create({
      ...createTweetDto,
      user,
    });
    return await this.tweetRepository.save(tweet);
  }
}
