import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMaintenanceDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    scratches?: boolean;

    @IsOptional()
    @IsBoolean()
    dents?: boolean;

    @IsOptional()
    @IsBoolean()
    lights?: boolean;

    @IsOptional()
    @IsBoolean()
    tires?: boolean;

    @IsOptional()
    @IsBoolean()
    windshield?: boolean;

    @IsOptional()
    @IsBoolean()
    mirrors?: boolean;

    @IsOptional()
    @IsBoolean()
    foreign_fluids?: boolean;

    @IsOptional()
    @IsBoolean()
    brakes?: boolean;

    @IsOptional()
    @IsBoolean()
    documents?: boolean;
}
