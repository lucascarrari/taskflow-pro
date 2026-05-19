import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TaskService } from '../../../core/services/task';

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

  tasks$ = this.taskService.tasks$;

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    project: ['', Validators.required],
    priority: ['Média', Validators.required],
    status: ['Pendente', Validators.required]
  });

  createTask(): void {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const currentTasks = this.taskService.getTasks();

    this.taskService.addTask({
      id: currentTasks.length + 1,
      title: this.taskForm.value.title ?? '',
      project: this.taskForm.value.project ?? '',
      priority: this.taskForm.value.priority as any,
      status: this.taskForm.value.status as any
    });

    this.taskForm.reset({
      priority: 'Média',
      status: 'Pendente'
    });
  }
}