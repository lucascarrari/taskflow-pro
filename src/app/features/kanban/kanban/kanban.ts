import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [AsyncPipe],
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
}