import { IsNotEmpty, MinLength, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsPhoneNumber()
    @ApiPropertyOptional()
    @IsOptional()
    readonly phone: string | null;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}