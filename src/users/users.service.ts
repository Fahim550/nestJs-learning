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
import { Profile } from 'src/profile/profile.entity';
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
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(userDto: CreateUserDto) {
    // create a profile and save it
    // userDto.profile = userDto.profile ?? {};
    // const profile = this.profileRepository.create(userDto?.profile);
    // await this.profileRepository.save(profile);
    // create user object
    const profile = this.profileRepository.create({ ...userDto.profile });
    // const { profile, ...userData } = userDto;
    const user = this.usersRepository.create({
      ...userDto,
      password: await this.hashingProvider.hashPassword(userDto.password),
      profile,
    });
    // set the profile to the user
    // save the user
    return await this.usersRepository.save(user);
    // const user = await this.usersRepository.findOne({
    //   where: { email: userDto.email },
    // });
    // if (user) {
    //   throw new Error('User already exists');
    // }

    // const newUser = this.usersRepository.create({
    //   ...userDto,
    //   password: await this.hashingProvider.hashPassword(userDto.password),
    // });
    // return await this.usersRepository.save(newUser);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, dto);
    if (dto.profile && user.profile) {
      Object.assign(user.profile, dto.profile);
    }

    if (dto.profile && user.profile) {
      Object.assign(user.profile, dto.profile);
    }

    return this.usersRepository.save(user);
  }

  async delete(id: number) {
    // find the user by id
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (user) {
      await this.usersRepository.delete(id);
    }
    if (user?.profile) {
      await this.profileRepository.delete(user?.profile?.id);
    } else {
      console.log('User has no profile');
    }
    return {
      delete: true,
    };
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

  public async findUserById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}
