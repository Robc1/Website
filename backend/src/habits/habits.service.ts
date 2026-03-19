import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto, UpdateHabitDto } from './dto/create-habit.dto';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  async create(createHabitDto: CreateHabitDto) {
    return this.prisma.habit.create({
      data: createHabitDto,
    });
  }

  async findAll() {
    return this.prisma.habit.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.habit.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateHabitDto: UpdateHabitDto) {
    return this.prisma.habit.update({
      where: { id },
      data: updateHabitDto,
    });
  }

  async remove(id: number) {
    return this.prisma.habit.delete({
      where: { id },
    });
  }
}
