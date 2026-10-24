import { Component, input, output } from '@angular/core';
import { TaskList } from '../../../projects/components/task-list/task-list';
import { Task, TaskStatus } from '../../../projects/models/task.model';

@Component({
  selector: 'app-user-project-group',
  imports: [TaskList],
  templateUrl: './user-project-group.html',
})
export class UserProjectGroup {
  projectName = input.required<string>();
  tasks = input.required<Task[]>();
  projectId = input.required<number>();

  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus; projectId?: number }>();
}
