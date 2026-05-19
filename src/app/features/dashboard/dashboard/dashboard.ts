import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TaskService } from '../../../core/services/task';

interface DashboardMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
  trend: string;
}

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

  metrics: DashboardMetric[] = [
    {
      label: 'Total de Projetos',
      value: '12',
      description: 'Projetos ativos no sistema',
      icon: '📁',
      trend: '+2 desde o último mês'
    },
    {
      label: 'Tarefas Pendentes',
      value: '34',
      description: 'Tarefas aguardando execução',
      icon: '⏳',
      trend: '+5 nesta semana'
    },
    {
      label: 'Tarefas Concluídas',
      value: '128',
      description: 'Tarefas finalizadas',
      icon: '✅',
      trend: '+18 neste mês'
    },
    {
      label: 'Produtividade',
      value: '86%',
      description: 'Média geral da equipe',
      icon: '📈',
      trend: '+7% de evolução'
    }
  ];
}