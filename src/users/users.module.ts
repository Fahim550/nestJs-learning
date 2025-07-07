import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/profile/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { TweetModule } from 'src/tweet/tweet.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => TweetModule),
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UsersModule {}
