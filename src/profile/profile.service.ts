import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  // create(createProfileDto: ProfileDto) {
  //   return 'This action adds a new profile';
  // }

  findAll() {
    return this.profileRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }
}
