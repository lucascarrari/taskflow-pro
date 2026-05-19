import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Criar tela de login',
      project: 'TaskFlow Pro',
      priority: 'Alta',
      status: 'Concluída'
    },
    {
      id: 2,
      title: 'Implementar dashboard',
      project: 'TaskFlow Pro',
      priority: 'Alta',
      status: 'Em andamento'
    },
    {
      id: 3,
      title: 'Criar CRUD de projetos',
      project: 'TaskFlow Pro',
      priority: 'Média',
      status: 'Pendente'
    },
    {
      id: 4,
      title: 'Configurar testes unitários',
      project: 'Qualidade',
      priority: 'Média',
      status: 'Pendente'
    }
  ]);

  readonly tasks$: Observable<Task[]> =
    this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Task): void {

    const currentTasks = this.tasksSubject.value;

    this.tasksSubject.next([
      ...currentTasks,
      task
    ]);
  }
}