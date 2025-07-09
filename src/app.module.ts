import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config.ts';
import { AuthorizeGuard } from './auth/guards/authorize.guard';
import { ProductsModule } from './products/products.module';
import { ProfileModule } from './profile/profile.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TweetModule } from './tweet/tweet.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        // port: 3306,
        username: 'root',
        password: '',
        database: 'users',
        // entities: [User],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    ProfileModule,
    TweetModule,
    ReviewsModule,
    ProductsModule,
    JwtModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
  ],
})
export class AppModule {}
