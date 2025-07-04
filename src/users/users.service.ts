import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { createUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: createUserDto[] = [
    {
      id: 1,
      name: 'Fahim',
      email: 'fahim123@gmail.com',
      password: '123456',
      age: 21,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Kahim',
      email: 'fahim456@gmail.com',
      password: '123456',
      age: 25,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 3,
      name: 'furi',
      age: 25,
      email: 'furi789@gmail.com',
      password: '123456',
      gender: 'female',
      isMarried: false,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((x) => x.id === id);
  }

  createUser(user: createUserDto) {
    return this.users.push(user);
  }
}
