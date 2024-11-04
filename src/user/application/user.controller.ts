import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../interface/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post('validate/:id')
    async validateUserEmailAndDni(@Param('id') id: number, @Body() body: { email: string; dni: string }) {
        const { email, dni } = body;
        const validationResult = await this.userService.isEmailOrDniTaken(email, dni, id);
        return validationResult;
    }
}
