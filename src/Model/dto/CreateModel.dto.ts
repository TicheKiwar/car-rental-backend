import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength, Min, Max } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  modelName: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1) // Año actual o siguiente
  year?: number;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;
}
