import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt'; 
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './users.repository';

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.TOKEN,
        signOptions: {
          expiresIn: '1h',
        },
      }),
      AuthModule
    ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
