import { Component } from '@angular/core';

interface DashboardMetric {
  label: string;
  value: string;
  description: string;
  icon: string;
  trend: string;
}

interface RecentTask {
  title: string;
  project: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  status: 'Pendente' | 'Em andamento' | 'Concluída';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  metrics: DashboardMetric[] = [
    {
      label: 'Total de Projetos',
      value: '12',
      description: 'Projetos ativos no sistema',
      icon: '📊',
      trend: '↑ 12%'
    },
    {
      label: 'Tarefas Pendentes',
      value: '34',
      description: 'Tarefas aguardando execução',
      icon: '📋',
      trend: '↓ 5%'
    },
    {
      label: 'Tarefas Concluídas',
      value: '128',
      description: 'Tarefas finalizadas',
      icon: '✅',
      trend: '↑ 20%'
    },
    {
      label: 'Produtividade',
      value: '86%',
      description: 'Média geral da equipe',
      icon: '⚡',
      trend: '↑ 8%'
    }
  ];

  recentTasks: RecentTask[] = [
    {
      title: 'Criar tela de login',
      project: 'TaskFlow Pro',
      priority: 'Alta',
      status: 'Concluída'
    },
    {
      title: 'Implementar dashboard',
      project: 'TaskFlow Pro',
      priority: 'Alta',
      status: 'Em andamento'
    },
    {
      title: 'Criar CRUD de projetos',
      project: 'TaskFlow Pro',
      priority: 'Média',
      status: 'Pendente'
    },
    {
      title: 'Configurar testes unitários',
      project: 'Qualidade',
      priority: 'Média',
      status: 'Pendente'
    }
  ];
}