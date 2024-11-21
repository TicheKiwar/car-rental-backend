import { IsOptional, IsNumber, IsString, MaxLength, Min, Max } from 'class-validator';

export class UpdateModelDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  modelName?: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @IsOptional()
  @IsNumber()
  brandId?: number;
}
