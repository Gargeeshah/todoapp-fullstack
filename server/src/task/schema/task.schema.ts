import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ enum: ['minor', 'moderate', 'critical'], default: 'moderate' })
  priority: string;

  @Prop()
  dueDate: Date;

  @Prop({ default: false })
  reminder: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
