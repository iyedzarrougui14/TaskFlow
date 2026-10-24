import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../../projects/models/project.model';
import { TaskStatus } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, UserCard, EmptyState],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);

  users = signal<User[]>([]);
  projects = signal<Project[]>([]);
  searchTerm = signal('');
  selectedUser = signal<User | null>(null);

  filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.users().filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
    );
  });

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => this.users.set(users));
    this.projectService.getProjects().subscribe((projects) => this.projects.set(projects));
  }

  onUserSelected(user: User): void {
    this.selectedUser.set(user);
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus; projectId?: number }): void {
    this.projects.update((projects) =>
      projects.map((p) => {
        if (event.projectId !== undefined && p.id !== event.projectId) return p;
        const taskExists = p.tasks.some((t) => t.id === event.taskId);
        if (!taskExists && event.projectId === undefined) return p;

        return {
          ...p,
          tasks: p.tasks.map((t) =>
            t.id === event.taskId ? { ...t, status: event.newStatus } : t
          ),
        };
      })
    );
  }
}
