import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { User } from 'src/users/user.entity.js';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config.ts';
import { LoginDto } from './dto/create-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { ActiveUserType } from './interfaces/active-user-type.interface.js';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersServices: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
  ) {}
  isAuthenticated: boolean = false;

  public async login(loginDto: LoginDto) {
    const user = await this.usersServices.findUserByEmail(loginDto.email);

    let isEqual: boolean = false;

    isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Invalid password');
    }

    // const token = await this.jwtService.signAsync(
    //   {
    //     email: user.email,
    //     sub: user.id,
    //   },
    //   {
    //     secret: this.authConfiguration.secret,
    //     expiresIn: this.authConfiguration.expiresIn,
    //     audience: this.authConfiguration.audience,
    //     issuer: this.authConfiguration.issuer,
    //   },
    // );

    // const refreshToken = await this.jwtService.signAsync(
    //   {
    //     email: user.email,
    //     sub: user.id,
    //   },
    //   {
    //     secret: this.authConfiguration.secret,
    //     expiresIn: this.authConfiguration.refreshExpiresIn,
    //   },
    // );
    return this.generateTokens(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersServices.createUser(createUserDto);
    if (!user) {
      return 'Signup failed';
    }
    return `User  created successfully`;
  }

  public async RefreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );

      const user = await this.usersServices.findUserById(sub);
      if (!user) {
        throw new UnauthorizedException(`User not found with id ${sub}`);
      }

      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(`Invalid refresh token ${error}`);
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }

  private async generateTokens(user: User) {
    const accessToken = await this.signToken<Partial<ActiveUserType>>(
      user.id,
      this.authConfiguration.expiresIn,
      { email: user.email },
    );
    const refreshToken = await this.signToken(
      user.id,
      this.authConfiguration.refreshExpiresIn,
    );
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
