import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { User } from '../../../users/models/user.model';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [NgClass, DatePipe, DeadlinePipe, TruncatePipe, HighlightDirective],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private readonly userService = inject(UserService);

  tasks = input.required<Task[]>();
  // Masqué dans la vue « Par user » où le nom de l'assigné est redondant
  showAssignee = input(true);

  private readonly users = signal<User[]>([]);

  // Bordure latérale selon le statut (appliquée avec ngClass)
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

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => this.users.set(users));
  }

  assigneeName(task: Task): string | null {
    if (task.assigneeId === undefined) return null;
    return this.users().find((u) => u.id === task.assigneeId)?.name ?? null;
  }
}
