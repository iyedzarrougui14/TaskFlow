import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  imports: [FormsModule, ProjectCard, EmptyState],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  private readonly projectService = inject(ProjectService);

  // Signals (état local)
  projects = signal<Project[]>([]);
  searchTerm = signal('');
  selectedProject = signal<Project | null>(null);

  // Signal calculé : se recalcule quand projects ou searchTerm change
  filteredProjects = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.projects().filter((project) => project.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    // Souscription explicite à l'Observable (RxJS) puis mise à jour du signal
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  onProjectSelected(project: Project): void {
    console.log(project);
    this.selectedProject.set(project);
  }
}
