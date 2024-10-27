import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @Length(1, 100)
    direccion?: string;

    @IsString()
    @Length(1, 15)
    telefono?: string;

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
    contraseA?: string;
}
