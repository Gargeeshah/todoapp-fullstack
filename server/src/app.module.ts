import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import {ReminderSchedulerModule} from './task/reminder-scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    AuthModule,
    ReminderSchedulerModule,
  ],
})
export class AppModule {}
