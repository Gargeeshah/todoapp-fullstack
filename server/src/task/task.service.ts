import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthService } from '../auth/auth.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly userService: AuthService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find({ createdBy: userId })
      .populate('createdBy', 'name')
      .exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    return this.taskModel
      .findOne({ _id: id, createdBy: userId })
      .populate('createdBy', 'name')
      .exec();
  }

  async updateState(
    id: string,
    updateStatusDto: UpdateStatusDto,
    userId: string,
  ): Promise<Task> {
    return this.taskModel
      .findOneAndUpdate(
        { _id: id, createdBy: userId },
        { isCompleted: updateStatusDto.isCompleted },
        {
          new: true,
        },
      )
      .exec();
  }

    async updateAll(
      id: string,
      updateTaskDto: UpdateTaskDto,
      userId: string,
    ): Promise<Task> {
      return this.taskModel
        .findOneAndUpdate(
          { _id: id, createdBy: userId },
          { title: updateTaskDto.title,
            description: updateTaskDto.description,
            priority: updateTaskDto.priority,
            dueDate: updateTaskDto.dueDate,
            reminder:updateTaskDto.reminder,
          },
          { new: true, },
        )
        .exec();
        
        }
    

  async remove(id: string, userId: string): Promise<Task> {
    return this.taskModel
      .findOneAndDelete({ _id: id, createdBy: userId })
      .exec();
  }

  async sendReminderEmail(task, user) {
    const email = user?.email //'test1@todosprintteam.testinator.com'
    const username = user?.name
    console.log("email: ",email)
    const { title, description, dueDate, priority } = task; 
   
    
    const subject = "Upcoming Deadline: " + title + " on " + dueDate.toISOString().split('T')[0];
    console.log("Subject: ",subject)
    const body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Task Reminder</title>
    </head>
    <body>
        <p>Dear ${username},</p>
    
        <p>I hope this message finds you well.</p>
    
        <p>This is a friendly reminder that the task “<strong>${title}</strong>” is due in <strong style="color: red;">15 days</strong>. Please review the details below:</p>
    
        <p>
           <strong>Description:</strong> ${description}<br>
           <strong>Priority:</strong> ${priority}<br>
    
        <p>If you have already completed this task or are not interested in receiving further reminders, please update your information accordingly.</p>
        <p>Thank you for your attention to this matter.</p>
    
    </body>
    </html>
    `;
  
    const mailOptions = {
      from: 'no-reply@todoSprint.com',  //support@todosprint.com
      to: email,
      subject,
      html: body,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io', 
      port: 587, 
      auth: {
        user: '6e2a124200c33c',
        pass: '5fcb2c6fd407a8',
      },
    });

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }

  async checkTasksAndSendReminders() {
    try {
      const currentDate = new Date();
      const targetDate = new Date();
      targetDate.setDate(currentDate.getDate() + 15);
      const targetDateString = targetDate.toISOString().split('T')[0];

      const tasks = await this.taskModel
        .find({
          reminder: true,
          isCompleted: false,
          dueDate: targetDateString,
        })
        .populate('createdBy', 'email')
        .exec();
        for (const task of tasks) {
          const { createdBy } = task;
          const user = await this.userService.getUserById(createdBy);
          await this.sendReminderEmail(task,user);
        }
    }catch (error) {
      console.error('Error checking tasks and sending reminders:', error);
    }
  }
}
