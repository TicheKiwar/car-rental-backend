import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entity/Users.entity';
import { Roles } from '../../entity/Roles.entity';
import { Repository } from 'typeorm';

describe('AuthController (integration)', () => {
  let app: INestApplication;
  let userRepository: Repository<Users>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Users, Roles],
          synchronize: true, // Crea la estructura de la base de datos automáticamente
        }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get('UsersRepository');

    // Crear datos de prueba
    const roleAdmin = new Roles();
    roleAdmin.roleName = 'admin';
    const roleEmployee = new Roles();
    roleEmployee.roleName = 'employe';

    const adminUser = new Users();
    adminUser.email = 'admin@example.com';
    adminUser.password = await adminUser.hashPassword.call({ password: 'admin123' });
    adminUser.role = roleAdmin;

    const employeeUser = new Users();
    employeeUser.email = 'employee@example.com';
    employeeUser.password = await employeeUser.hashPassword.call({ password: 'employee123' });
    employeeUser.role = roleEmployee;

    await userRepository.save([adminUser, employeeUser]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should log in as an admin', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.role).toBe('admin');
        expect(body.message).toBe('Login successful');
      });
  });

  it('should log in as an employee', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'employee@example.com', password: 'employee123' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.role).toBe('employe');
        expect(body.message).toBe('Login successful');
      });
  });

  it('should return 401 for invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'wrongpassword' })
      .expect(401)
      .expect(({ body }) => {
        expect(body.message).toBe('Invalid credentials');
      });
  });
});
