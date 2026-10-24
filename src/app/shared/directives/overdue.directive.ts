import { Directive, HostBinding, computed, input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
})
export class OverdueDirective {
  appOverdue = input<any>();
  dueDate = input<string | Date | null | undefined>();
  done = input<boolean | string | undefined>();

  private readonly resolvedDueDate = computed(() => {
    const d = this.dueDate();
    if (d !== undefined && d !== null) return d;
    const app = this.appOverdue();
    if (app && typeof app === 'object') {
      return app.dueDate ?? app.date;
    }
    return undefined;
  });

  private readonly resolvedDone = computed(() => {
    const dn = this.done();
    if (dn !== undefined && dn !== null) return dn;
    const app = this.appOverdue();
    if (app && typeof app === 'object') {
      return app.done ?? (app.status === 'Terminé');
    }
    if (typeof app === 'boolean') return app;
    return false;
  });

  private isOverdue(): boolean {
    const dueVal = this.resolvedDueDate();
    if (!dueVal) return false;

    const doneVal = this.resolvedDone();
    const isTaskDone = typeof doneVal === 'boolean' ? doneVal : doneVal === 'Terminé' || doneVal === 'done';
    if (isTaskDone) return false;

    let due: Date;
    if (typeof dueVal === 'string') {
      const parts = dueVal.split('-').map(Number);
      if (parts.length === 3 && !parts.some(isNaN)) {
        due = new Date(parts[0], parts[1] - 1, parts[2]);
      } else {
        due = new Date(dueVal);
      }
    } else {
      due = dueVal;
    }

    if (isNaN(due.getTime())) return false;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueNormalized = new Date(due.getFullYear(), due.getMonth(), due.getDate());

    return dueNormalized.getTime() < today.getTime();
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.isOverdue() ? 'border-red-500 bg-red-50' : '';
  }
}
