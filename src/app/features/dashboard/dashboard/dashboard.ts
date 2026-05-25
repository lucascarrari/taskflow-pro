import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  LucideAngularModule,
  TrendingUp
} from 'lucide-angular';

import { map } from 'rxjs';

import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    BaseChartDirective,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private readonly taskService = inject(TaskService);

  readonly icons = {
    projects: FolderKanban,
    pending: Clock3,
    completed: CheckCircle2,
    productivity: TrendingUp
  };

  tasks$ = this.taskService.tasks$;

  recentTasks$ = this.tasks$.pipe(
    map((tasks) => tasks.slice(-5).reverse())
  );

  statusSummary$ = this.tasks$.pipe(
    map((tasks) => {
      const total = tasks.length || 1;

      const pending = tasks.filter(
        (task) => task.status === 'Pendente'
      ).length;

      const inProgress = tasks.filter(
        (task) => task.status === 'Em andamento'
      ).length;

      const completed = tasks.filter(
        (task) => task.status === 'Concluída'
      ).length;

      return {
        pending,
        inProgress,
        completed,
        pendingPercent: Math.round((pending / total) * 100),
        inProgressPercent: Math.round((inProgress / total) * 100),
        completedPercent: Math.round((completed / total) * 100)
      };
    })
  );

  readonly doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  statusChartData$ = this.tasks$.pipe(
    map((tasks): ChartData<'doughnut'> => {
      const pending = tasks.filter(
        (task) => task.status === 'Pendente'
      ).length;

      const inProgress = tasks.filter(
        (task) => task.status === 'Em andamento'
      ).length;

      const completed = tasks.filter(
        (task) => task.status === 'Concluída'
      ).length;

      return {
        labels: [
          'Pendente',
          'Em andamento',
          'Concluída'
        ],
        datasets: [
          {
            data: [
              pending,
              inProgress,
              completed
            ],
            borderWidth: 0
          }
        ]
      };
    })
  );

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
          label: 'Projetos',
          value: String(totalProjects),
          description: 'Projetos ativos',
          icon: this.icons.projects,
          trend: 'Baseado nas tarefas',
          type: 'projects'
        },
        {
          label: 'Pendentes',
          value: String(pendingTasks),
          description: 'Aguardando execução',
          icon: this.icons.pending,
          trend: `${pendingTasks} tarefas pendentes`,
          type: 'pending'
        },
        {
          label: 'Concluídas',
          value: String(completedTasks),
          description: 'Finalizadas com sucesso',
          icon: this.icons.completed,
          trend: `${completedTasks} tarefas concluídas`,
          type: 'completed'
        },
        {
          label: 'Produtividade',
          value: `${productivity}%`,
          description: 'Taxa de conclusão',
          icon: this.icons.productivity,
          trend: `${completedTasks} de ${totalTasks} tarefas`,
          type: 'productivity'
        }
      ];
    })
  );
  hasTasks$ = this.tasks$.pipe(
    map((tasks) => tasks.length > 0)
  );
  
  getPriorityClass(priority: string): string {
    return `badge priority-${priority.toLowerCase()}`;
  }

  getStatusClass(status: string): string {
    return `badge status-${status.toLowerCase().replace(' ', '-')}`;
  }
}