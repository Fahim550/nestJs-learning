import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(@Query() query: any) {
    // const usersService = new UsersService();
    // if (query.gender) {
    //   return this.usersService
    //     .getAllUsers()
    //     .filter((u) => u.gender === query.gender);
    // }
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthorizeGuard)
  @Get(':id')
  getUsersById(@Param('id') id: any) {
    // console.log(param);
    // const usersService = new UsersService();
    return this.usersService.getUserById(+id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    // const usersService = new UsersService();
    // usersService.createUser(user);
    console.log(user);
    return this.usersService.createUser(user);
  }

  @Patch()
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
