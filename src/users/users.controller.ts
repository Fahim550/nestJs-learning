import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: any) {
    // const usersService = new UsersService();
    if (query.gender) {
      return this.usersService
        .getAllUsers()
        .filter((u) => u.gender === query.gender);
    }
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: any) {
    // console.log(param);
    // const usersService = new UsersService();
    return this.usersService.getUserById(+id);
  }

  @Post()
  createUser(@Body() user: createUserDto) {
    // const user = {
    //   id: 3,
    //   name: 'Rahim',
    //   age: 20,
    //   gender: 'male',
    //   isMarried: false,
    // };
    // const usersService = new UsersService();
    // usersService.createUser(user);
    console.log(user);
    return 'User created successfully';
  }

  @Patch()
  updateUser(@Body() user: UpdateUserDto) {
    // const usersService = new UsersService();
    // const existingUser = usersService.getUserById(user.id);
    // if (!existingUser) {
    //   return 'User not found';
    // }
    console.log(user);
  }
}
