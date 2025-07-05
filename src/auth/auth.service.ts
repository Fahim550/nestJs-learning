import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config.ts';
import { LoginDto } from './dto/create-auth.dto';
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

  async login(loginDto: LoginDto) {
    const user = await this.usersServices.findUserByEmail(loginDto.email);

    let isEqual: boolean = false;

    isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Invalid password');
    }
    // const user = this.usersServices.find(
    //   (u) =>
    //     u.email === LoginDto.email &&
    //     u.password === LoginDto.password,
    // );
    // if (!user) {
    //   return 'Invalid email or password';
    // }
    // return `Welcome ${user}`;
    // return 'Login successful for ' + loginDto.email;
    // return user;
    const token = await this.jwtService.signAsync(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresIn,
      },
    );
    return {
      access_token: token,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersServices.createUser(createUserDto);
    if (!user) {
      return 'Signup failed';
    }
    return `User ${user?.name} created successfully`;
  }
}
