import { Component, input, output } from '@angular/core';

export interface ToggleOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  // Deux options par défaut, mais le composant reste générique
  options = input<ToggleOption[]>([
    { value: 'tasks', label: 'Par tâche' },
    { value: 'users', label: 'Par user' },
  ]);
  active = input.required<string>();

  activeChange = output<string>();

  select(value: string): void {
    if (value !== this.active()) {
      this.activeChange.emit(value);
    }
  }
}
