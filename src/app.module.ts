import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';


import { BrandModule } from './Brand/brand.module';
import { ModelModule } from './Model/model.module';
import { VehiclesModule } from './Vehicle/vehicle.module';
import { AuthModule } from './Auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';  // Importa ServeStaticModule
import { join } from 'path';  // Para manejar las rutas
import { catalogModule } from './Catalog/Catalog.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReturnsModule } from './Return/return.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      ssl: process.env.SSL === 'false',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Ruta de tu carpeta 'public'
      serveRoot: '/', // Asegura que las imágenes estén accesibles desde la raíz
    }),
    UserModule,
    AuthModule,
    catalogModule,
    BrandModule,
    ModelModule,
    VehiclesModule,
    ReservationsModule,
    ReturnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
