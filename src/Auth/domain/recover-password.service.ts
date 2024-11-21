import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from './mailer.service';
import { UserService } from 'src/user/interface/user.service';

@Injectable()
export class RecoverPasswordService {
    constructor(
        private userService: UserService,
        private mailService: MailerService,
    ) { }

    async recoverPasswordEmail(email: string): Promise<void> {
        const user = await this.userService.findUser(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const token = uuidv4();
        await this.userService.savePasswordResetToken(user.userId, token);

        const resetUrl = `http://localhost:5173/reset_password/${token}`;
        await this.mailService.sendMailRecoverPassword(email, resetUrl);
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const user = await this.userService.verifyPasswordResetToken(token);

        user.password = newPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await this.userService.saveUser(user);
    }
}
