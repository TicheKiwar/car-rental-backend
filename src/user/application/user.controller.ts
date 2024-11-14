import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from '../interface/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findUserById(@Param('id') id: number) {
        const data = await this.userService.findById(id);
        return { message: `Usuario con ID ${id}`, data };
    }

    @Post('validate/:id')
    async validateUserEmailAndDni(@Param('id') id: number, @Body() body: { email: string; dni: string }) {
        const { email, dni } = body;
        const validationResult = await this.userService.isEmailOrDniTaken(email, dni, id);
        return validationResult;
    }
}
