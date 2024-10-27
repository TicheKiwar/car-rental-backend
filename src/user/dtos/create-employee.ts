import { IsDateString, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    @Length(1, 50)
    puesto?: string;

    @IsOptional()
    @IsDateString()
    fechaContratacion?: string;

    @IsString()
    @Length(1, 50)
    nombre?: string;

    @IsString()
    @Length(1, 50)
    apellido?: string;

    @IsEmail()
    @Length(1, 50)
    correo?: string;

    @IsString()
    @Length(1, 50)
    rol?: string;

    @IsString()
    @Length(1, 50)
    contraseA?: string;
}
