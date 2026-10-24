import { Component } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';

@Component({
  selector: 'app-root',
  imports: [ProjectList],
  templateUrl: './app.html',
})
export class App {}
