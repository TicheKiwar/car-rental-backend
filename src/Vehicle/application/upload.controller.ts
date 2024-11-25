import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/vehicles',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname).toLowerCase();
          if (ext !== '.jpg') {
            return callback(new Error('Formato incorrecto. Solo se aceptan imágenes JPG'), null);
          }

          // Usar el nombre original del archivo
          callback(null, file.originalname); // No modificar el nombre, usa el original
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Devuelve la ruta de la imagen con el nombre original
    const imagePath = `/images/vehicles/${file.filename}`;
    return { imagePath };
  }
}


