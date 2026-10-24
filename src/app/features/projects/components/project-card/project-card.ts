import { Component, computed, input, output, signal } from '@angular/core';
import {
  CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgClass, NgStyle, PercentPipe, SlicePipe,
  UpperCasePipe,
} from '@angular/common';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskPriority } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  imports: [
    TaskList, NgClass, NgStyle, UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe,
    SlicePipe, KeyValuePipe, HighlightDirective,
  ],
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

  /** Affiche toutes les tâches (true) ou seulement les 3 premières (false). */
  showAll = signal(false);

  /** Taux de réalisation entre 0 et 1 (0 si aucune tâche : pas de division par zéro). */
  completionRate = computed(() => {
    const tasks = this.project().tasks;
    if (tasks.length === 0) return 0;
    return tasks.filter((t) => t.status === 'Terminé').length / tasks.length;
  });

  /** Coût moyen par tâche (0 si aucune tâche). */
  averageCost = computed(() => {
    const { budget, tasks } = this.project();
    return tasks.length === 0 ? 0 : budget / tasks.length;
  });

  /** Couleur de la barre : rouge < 34 %, orange jusqu'à 66 %, vert au-delà. */
  barColor = computed(() => {
    const pct = this.completionRate() * 100;
    if (pct < 34) return '#ef4444';
    if (pct <= 66) return '#f59e0b';
    return '#22c55e';
  });

  /** Nombre de tâches par priorité (affiché avec le pipe keyvalue). */
  tasksByPriority = computed<Record<TaskPriority, number>>(() => {
    const counts: Record<TaskPriority, number> = { Basse: 0, Haute: 0, Moyenne: 0 };
    for (const t of this.project().tasks) counts[t.priority]++;
    return counts;
  });

  toggleShowAll(): void {
    this.showAll.update((value) => !value);
  }

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }
}
