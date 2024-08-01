export class CreateTaskDto {
  readonly title: string;
  readonly description?: string;
  readonly priority?: string;
  readonly dueDate?: Date;
  readonly reminder?: boolean;
  readonly category?: string;
  createdBy: string;
}
