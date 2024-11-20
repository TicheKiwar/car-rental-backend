import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UserModule } from './user/user.module';
import { catalogModule } from './Catalog/Catalog.module';
import { BrandModule } from './Brand/brand.module';
import { ModelModule } from './Model/model.module';
import { VehiclesModule } from './Vehicle/vehicle.module';

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
    UserModule, AuthModule, catalogModule, BrandModule, ModelModule, VehiclesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }