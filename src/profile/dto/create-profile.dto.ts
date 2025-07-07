// src/profile/dto/create-profile.dto.ts
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9+\-() ]+$/, {
    message: 'phone must be a valid phone number',
  })
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsDateString({}, { message: 'dateOfBirth must be a valid ISO date string' })
  @IsOptional()
  dateOfBirth?: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  isMarried: boolean;
}
