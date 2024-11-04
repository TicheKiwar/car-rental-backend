import { IsEmail, IsNumber, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @Length(1, 50)
    email: string;

    @IsString()
    @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    password: string;
}