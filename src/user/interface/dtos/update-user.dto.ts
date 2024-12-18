import { IsEmail, IsOptional, Length } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @Length(1, 50)
    email: string;
}