import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private readonly taskService = inject(TaskService);

  tasks$ = this.taskService.tasks$;

  metrics$ = this.tasks$.pipe(
    map((tasks) => {
      const totalTasks = tasks.length;

      const pendingTasks = tasks.filter(
        (task) => task.status === 'Pendente'
      ).length;

      const completedTasks = tasks.filter(
        (task) => task.status === 'Concluída'
      ).length;

      const productivity =
        totalTasks > 0
          ? Math.round((completedTasks / totalTasks) * 100)
          : 0;

      const totalProjects = new Set(
        tasks.map((task) => task.project)
      ).size;

      return [
        {
          label: 'Total de Projetos',
          value: String(totalProjects),
          description: 'Projetos ativos no sistema',
          icon: '📁',
          trend: 'Calculado pelas tarefas'
        },
        {
          label: 'Tarefas Pendentes',
          value: String(pendingTasks),
          description: 'Tarefas aguardando execução',
          icon: '⏳',
          trend: `${pendingTasks} pendentes agora`
        },
        {
          label: 'Tarefas Concluídas',
          value: String(completedTasks),
          description: 'Tarefas finalizadas',
          icon: '✅',
          trend: `${completedTasks} concluídas`
        },
        {
          label: 'Produtividade',
          value: `${productivity}%`,
          description: 'Média geral da equipe',
          icon: '📈',
          trend: `${completedTasks} de ${totalTasks} tarefas`
        }
      ];
    })
  );
}