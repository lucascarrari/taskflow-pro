import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { map } from 'rxjs';

import { TaskService } from '../../../core/services/task';
import { Task, TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [AsyncPipe, DragDropModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss'
})
export class Kanban {
  private readonly taskService = inject(TaskService);

  pendingTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'Pendente'))
  );

  inProgressTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'Em andamento'))
  );

  completedTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'Concluída'))
  );

  drop(event: CdkDragDrop<Task[] | null>, status: TaskStatus): void {
  const taskId = Number(event.item.data);

  this.taskService.updateTaskStatus(taskId, status);
}
}