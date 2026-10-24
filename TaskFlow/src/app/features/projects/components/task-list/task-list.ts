import { Component, input } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();

  // Bordure latérale selon le statut
  readonly borderClasses: Record<TaskStatus, string> = {
    'En attente': 'border-l-4 border-yellow-400 bg-yellow-50',
    'En cours': 'border-l-4 border-blue-500 bg-blue-50',
    'Terminé': 'border-l-4 border-green-500 bg-green-50',
  };

  readonly statusClasses: Record<TaskStatus, string> = {
    'En attente': 'text-yellow-700',
    'En cours': 'text-blue-700',
    'Terminé': 'text-green-700',
  };

  readonly priorityClasses: Record<TaskPriority, string> = {
    Haute: 'bg-red-100 text-red-700',
    Moyenne: 'bg-orange-100 text-orange-700',
    Basse: 'bg-gray-200 text-gray-700',
  };
}
