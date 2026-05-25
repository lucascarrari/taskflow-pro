import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BehaviorSubject, Observable } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'taskflow_tasks';
  private readonly platformId = inject(PLATFORM_ID);

  private readonly defaultTasks: Task[] = [
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
  ];

  private readonly tasksSubject = new BehaviorSubject<Task[]>(
    this.loadTasks()
  );

  readonly tasks$: Observable<Task[]> =
    this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, task];

    this.updateTasks(updatedTasks);
  }

  deleteTask(taskId: number): void {
    const updatedTasks = this.tasksSubject.value.filter(
      (task) => task.id !== taskId
    );

    this.updateTasks(updatedTasks);
  }

  updateTask(updatedTask: Task): void {
    const updatedTasks = this.tasksSubject.value.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    this.updateTasks(updatedTasks);
  }

  updateTaskStatus(
    taskId: number,
    status: 'Pendente' | 'Em andamento' | 'Concluída'
  ): void {
    const updatedTasks = this.tasksSubject.value.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...task,
        status
      };
    });

    this.updateTasks(updatedTasks);
  }

  private updateTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
    this.saveTasks(tasks);
  }

  private loadTasks(): Task[] {
    if (!isPlatformBrowser(this.platformId)) {
      return this.defaultTasks;
    }

    const storedTasks = localStorage.getItem(this.storageKey);

    if (!storedTasks) {
      return this.defaultTasks;
    }

    return JSON.parse(storedTasks) as Task[];
  }

  private saveTasks(tasks: Task[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );
  }
}