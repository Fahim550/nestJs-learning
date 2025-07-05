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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  @IsNotEmpty()
  password: string;
  @IsNumber()
  age: number;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsOptional()
  gender?: string;
  @IsBoolean()
  isMarried?: boolean;
}
