import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from './email.service';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'; 
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN || 'tajny-klic', // Nastav tajný klíč pro JwtModule
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
    CompanyModule
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, AuthRepository],
  exports:[EmailService]
})
export class AuthModule {}
