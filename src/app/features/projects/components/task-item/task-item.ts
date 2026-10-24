import { Component, input, output } from '@angular/core';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [
    NgClass, NgStyle, DatePipe, DeadlinePipe, TruncatePipe,
    HighlightDirective, OverdueDirective, TooltipDirective,
  ],
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input(true);
  assigneeName = input<string | null>(null);
  descriptionLimit = input(40);

  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus }>();

  cycleStatus(): void {
    const current = this.task().status;
    let next: TaskStatus = 'En attente';
    if (current === 'En attente') {
      next = 'En cours';
    } else if (current === 'En cours') {
      next = 'Terminé';
    } else if (current === 'Terminé') {
      next = 'En attente';
    }
    this.taskStatusChange.emit({ taskId: this.task().id, newStatus: next });
  }

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
