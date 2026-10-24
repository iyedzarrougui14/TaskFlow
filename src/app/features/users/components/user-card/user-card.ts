import { Component, computed, input, output } from '@angular/core';
import { LowerCasePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../../projects/models/project.model';
import { Task, TaskStatus } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';

interface ProjectTasks {
  projectId: number;
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  imports: [
    UserProjectGroup, EmptyState, NgClass, NgStyle, TitleCasePipe, LowerCasePipe, InitialsPipe,
    HighlightDirective,
  ],
  templateUrl: './user-card.html',
})
export class UserCard {
  user = input.required<User>();
  selected = input(false);
  userSelected = output<User>();
  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus; projectId?: number }>();

  private static readonly AVATAR_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6'];

  // Couleur de la pastille d'initiales (appliquée avec ngStyle)
  avatarColor = computed(
    () => UserCard.AVATAR_COLORS[this.user().id % UserCard.AVATAR_COLORS.length],
  );
  projects = input.required<Project[]>();

  // Tâches de l'utilisateur regroupées par projet (projets sans tâche ignorés)
  groups = computed<ProjectTasks[]>(() =>
    this.projects()
      .map((p) => ({
        projectId: p.id,
        projectName: p.name,
        tasks: p.tasks.filter((t) => t.assigneeId === this.user().id),
      }))
      .filter((g) => g.tasks.length > 0),
  );

  private readonly allTasks = computed(() => this.groups().flatMap((g) => g.tasks));

  todoCount = computed(() => this.allTasks().filter((t) => t.status === 'En attente').length);
  inProgressCount = computed(() => this.allTasks().filter((t) => t.status === 'En cours').length);
  doneCount = computed(() => this.allTasks().filter((t) => t.status === 'Terminé').length);

  selectUser(): void {
    this.userSelected.emit(this.user());
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus; projectId?: number }): void {
    this.taskStatusChange.emit(event);
  }
}
