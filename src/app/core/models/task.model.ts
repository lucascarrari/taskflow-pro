export type TaskPriority = 'Baixa' | 'Média' | 'Alta';

export type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluída';

export interface Task {
  id: number;
  title: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
}