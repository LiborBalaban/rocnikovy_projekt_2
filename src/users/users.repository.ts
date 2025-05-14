import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository{
  constructor(private readonly prisma: PrismaService) {}

  findAllByCompany(companyId: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { companyId },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
        where: { id },
      });
  }
}