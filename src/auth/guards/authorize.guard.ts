import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import authConfig from '../config/auth.config.ts';
import { REQUEST_USER_KEY } from '../constants/constants.js';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    // console.log(token);
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.authConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException('user is not authorization to access ');
    }
    return true;
  }
}
