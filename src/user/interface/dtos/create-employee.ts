import { IsDateString, IsDecimal, IsEmail, IsNumber, IsNumberString, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsEcuadorianId } from 'src/user/domain/user.decorator';

export class CreateEmployeeDto extends CreateUserDto {
    @IsNumberString()
    @Length(10, 10, { message: 'El DNI debe tener exactamente 10 dígitos.' })
    @IsEcuadorianId({ message: 'La cédula no es válida.' })
    dni: string;

    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
    firstName: string;

    @IsString({ message: 'El apellido debe ser una cadena de texto.' })
    @Length(1, 50, { message: 'El apellido debe tener entre 1 y 50 caracteres.' })
    lastName: string;

    @IsNumberString()
    @Length(10, 10, { message: 'El teléfono debe tener exactamente 10 dígitos.' })
    phone: string;

    @IsNumber()
    position: number;

    @IsDateString()
    hireDate: string;

    @IsNumber()
    salary: number;
}
