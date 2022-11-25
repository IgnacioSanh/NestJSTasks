import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskWithFilter(filter: GetTaskFilterDto): Task[] {
  //   const { search, status } = filter;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     const lowercaseSearch = search.toLowerCase();
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(lowercaseSearch) ||
  //         task.description.toLowerCase().includes(lowercaseSearch),
  //     );
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     ...createTaskDto,
  //     id: uuid(),
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('The task was not found');
    }

    return found;
  }

  // deleteTask(id: string): void {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
