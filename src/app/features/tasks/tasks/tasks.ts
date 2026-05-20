import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TaskService } from '../../../core/services/task';
import { combineLatest, map, startWith } from 'rxjs';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks {
  private readonly taskService = inject(TaskService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  tasks$ = this.taskService.tasks$;

  filterForm = this.formBuilder.group({
    search: [''],
    priority: ['Todas'],
    status: ['Todos']
  });

  filteredTasks$ = combineLatest([
    this.tasks$,
    this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value)
    )
  ]).pipe(
    map(([tasks, filters]) => {
      const search = filters.search?.toLowerCase() ?? '';
      const priority = filters.priority;
      const status = filters.status;

      return tasks.filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(search) ||
          task.project.toLowerCase().includes(search);

        const matchesPriority =
          priority === 'Todas' || task.priority === priority;

        const matchesStatus =
          status === 'Todos' || task.status === status;

        return matchesSearch && matchesPriority && matchesStatus;
      });
    })
  );

  editingTaskId: number | null = null;
  taskToDeleteId: number | null = null;

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    project: ['', Validators.required],
    priority: ['Média', Validators.required],
    status: ['Pendente', Validators.required]
  });

  saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData = {
      title: this.taskForm.value.title ?? '',
      project: this.taskForm.value.project ?? '',
      priority: this.taskForm.value.priority as any,
      status: this.taskForm.value.status as any
    };

    if (this.editingTaskId !== null) {
      this.taskService.updateTask({
        id: this.editingTaskId,
        ...taskData
      });
      this.toastService.show(
        'Tarefa atualizada com sucesso',
        'info'
      );

      this.cancelEdit();
      return;
    }

    const currentTasks = this.taskService.getTasks();

    this.taskService.addTask({
      id: currentTasks.length + 1,
      ...taskData
    });

    this.toastService.show(
      'Tarefa criada com sucesso',
      'success'
    );

    this.taskForm.reset({
      priority: 'Média',
      status: 'Pendente'
    });
  }

  editTask(taskId: number): void {
    const task = this.taskService.getTasks().find(
      (currentTask) => currentTask.id === taskId
    );

    if (!task) {
      return;
    }

    this.editingTaskId = task.id;

    this.taskForm.patchValue({
      title: task.title,
      project: task.project,
      priority: task.priority,
      status: task.status
    });
  }

  cancelEdit(): void {
    this.editingTaskId = null;

    this.taskForm.reset({
      priority: 'Média',
      status: 'Pendente'
    });
  }

  openDeleteModal(taskId: number): void {
    this.taskToDeleteId = taskId;
  }

  closeDeleteModal(): void {
    this.taskToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.taskToDeleteId === null) {
      return;
    }

    this.taskService.deleteTask(this.taskToDeleteId);
    this.toastService.show(
      'Tarefa removida com sucesso',
      'error'
    );
    this.closeDeleteModal();
  }

  getPriorityClass(priority: string): string {
    return `badge priority-${priority.toLowerCase()}`;
  }

  getStatusClass(status: string): string {
    return `badge status-${status.toLowerCase().replace(' ', '-')}`;
  }
}