import { IsDateString, IsDecimal, IsEmail, IsNumber, IsNumberString, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateEmployeeDto extends CreateUserDto {
    @IsNumberString()
    @Length(10)
    dni: string;

    @IsString()
    @Length(1, 50)
    firstName: string;

    @IsString()
    @Length(1, 50)
    lastName: string;

    @IsNumberString()
    @Length(10)
    phone: string;

    @IsNumber()
    position: number;

    @IsDateString()
    hireDate: string;

    @IsDecimal()
    salary: number;
}
