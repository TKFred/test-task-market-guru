import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterDto {
    @ApiPropertyOptional()
    @IsOptional()
    readonly name: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    readonly email: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    readonly phone: string | null;
}