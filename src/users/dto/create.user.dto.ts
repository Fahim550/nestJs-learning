import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  password: string;
  @IsNumber()
  age: number;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  gender?: string;
  @IsBoolean()
  isMarried?: boolean;
}
