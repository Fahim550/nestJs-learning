import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ActiceUser } from 'src/auth/decorators/active.user.decorator';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  // @Post()
  // create(@Body() createTweetDto: CreateTweetDto) {
  //   return this.tweetService.create(createTweetDto);
  // }

  @Post()
  public async createTweet(
    @Body() createTweetDto: CreateTweetDto,
    @ActiceUser() user,
  ) {
    return await this.tweetService.create(createTweetDto);
    // console.log(user);
  }

  @Get(':id')
  public Gettweets(@Param('id', ParseIntPipe) userid: number) {
    return this.tweetService.getTweetById(+userid);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
  //   return this.tweetService.update(+id, updateTweetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tweetService.remove(+id);
  // }
}
