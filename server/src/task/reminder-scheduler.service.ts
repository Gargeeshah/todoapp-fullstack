import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { TaskService } from './task.service';

@Injectable()
export class ReminderSchedulerService implements OnModuleInit {
  constructor(private readonly taskService: TaskService) {}

  // This method will be called once the module has been initialized
  async onModuleInit() {
    cron.schedule('0 8 * * *', async () => {
        console.log('Cron job triggered every minute'); 
        await this.taskService.checkTasksAndSendReminders();
      });
  }
}
