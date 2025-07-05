import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { HashingProvider } from 'src/auth/provider/hashing.provider';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  //   users: CreateUserDto[] = [
  //     {
  //       id: 1,
  //       name: 'Fahim',
  //       email: 'fahim123@gmail.com',
  //       password: '123456',
  //       age: 21,
  //       gender: 'male',
  //       isMarried: false,
  //     },
  //     {
  //       id: 2,
  //       name: 'Kahim',
  //       email: 'fahim456@gmail.com',
  //       password: '123456',
  //       age: 25,
  //       gender: 'male',
  //       isMarried: false,
  //     },
  //     {
  //       id: 3,
  //       name: 'furi',
  //       age: 25,
  //       email: 'furi789@gmail.com',
  //       password: '123456',
  //       gender: 'female',
  //       isMarried: false,
  //     },
  //   ];

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(userDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });
    if (user) {
      throw new Error('User already exists');
    }

    const newUser = this.usersRepository.create({
      ...userDto,
      password: await this.hashingProvider.hashPassword(userDto.password),
    });
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  public async findUserByEmail(email: string) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(`User with email ${email} not found`);
    }
    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }
    return user;
  }
}
