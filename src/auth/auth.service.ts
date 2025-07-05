import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersServices: UsersService,
  ) {}
  isAuthenticated: boolean = false;

  // login(createAuthDto: CreateAuthDto) {
  //   const user = this.usersServices.users.find(
  //     (u) =>
  //       u.email === createAuthDto.email &&
  //       u.password === createAuthDto.password,
  //   );
  //   if (!user) {
  //     return 'Invalid email or password';
  //   }
  //   return `Welcome ${user.name}`;
  // }
}
