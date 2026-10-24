import { Component, input, output } from '@angular/core';
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [TaskList],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  // Input : reçu depuis ProjectList
  project = input.required<Project>();
  selected = input(false);

  // Output : informe le parent
  projectSelected = output<Project>();

  readonly statusClasses: Record<ProjectStatus, string> = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'En cours': 'bg-blue-100 text-blue-800',
    'Terminé': 'bg-green-100 text-green-800',
  };

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
