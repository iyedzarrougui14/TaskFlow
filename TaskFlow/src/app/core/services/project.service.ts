import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';
import { PROJECTS } from '../../features/projects/data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  getProjects(): Observable<Project[]> {
    // Données statiques pour le moment : of() émet le tableau puis complète.
    return of(PROJECTS);
  }
}
