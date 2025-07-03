import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }[] = [
    { id: 1, name: 'Fahim', age: 21, gender: 'male', isMarried: false },
    { id: 2, name: 'Kahim', age: 25, gender: 'male', isMarried: false },
    { id: 3, name: 'furi', age: 25, gender: 'female', isMarried: false },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((x) => x.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }) {
    return this.users.push(user);
  }
}
