import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendMailRecoverPassword(email: string, resetUrl: string) {
        const mailOptions = {
            from: '"Soporte de AutoPick" <alexsanty10lm@gmail.com>',
            to: email,
            subject: "RECUPERACIÓN DE CONTRASEÑA",
            html: `<p>Se ha solicitado la recuperación de la contraseña para tu cuenta. Si no fuiste tú, ignora este mensaje</p>
            <p>Para recuperar tu contraseña haz clic en el siguiente enlace:</p>
             <a href="${resetUrl}">Recuperar Contraseña</a>`,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado: %s', info.messageId);
            return info;
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
        }
    }

    async sendVerificationEmail(email: string, code: string) {
        const mailOptions = {
            from: '"Soporte de AutoPick" <alexsanty10lm@gmail.com>',
            to: email,
            subject: 'Verificación de correo electrónico',
            text: `Tu código de verificación es: ${code}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
}