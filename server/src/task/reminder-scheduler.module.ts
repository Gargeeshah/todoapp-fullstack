import { Module } from '@nestjs/common';
import { ReminderSchedulerService } from './reminder-scheduler.service';
import {TaskModule} from './task.module';

@Module({
  imports: [TaskModule],
  providers: [ReminderSchedulerService], 
  exports: [ReminderSchedulerService],
})
export class ReminderSchedulerModule {}
