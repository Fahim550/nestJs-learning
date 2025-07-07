import { PartialType } from '@nestjs/mapped-types';
import { ProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(ProfileDto) {}
