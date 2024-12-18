import { IsNumber, IsNumberString, IsOptional, IsString, Length } from 'class-validator';
import { IsEcuadorianId } from 'src/user/domain/user.decorator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateEmployeeDto extends UpdateUserDto {
    @IsOptional()
    @IsNumberString()
    @Length(10, 10, { message: 'El DNI debe tener exactamente 10 dígitos.' })
    @IsEcuadorianId({ message: 'La cédula no es válida.' })
    dni: string;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres.' })
    firstName: string;

    @IsOptional()
    @IsString({ message: 'El apellido debe ser una cadena de texto.' })
    @Length(1, 50, { message: 'El apellido debe tener entre 1 y 50 caracteres.' })
    lastName: string;

    @IsOptional()
    @IsNumberString()
    @Length(10, 10, { message: 'El teléfono debe tener exactamente 10 dígitos.' })
    phone: string;

    @IsOptional()
    @IsNumber()
    position: number;

    @IsOptional()
    @IsNumber()
    salary: number;
}
