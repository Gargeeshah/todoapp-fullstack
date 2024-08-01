import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './schema/task.schema';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
