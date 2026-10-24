import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deadline' })
export class DeadlinePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return 'Pas d’échéance';

    let due: Date;
    if (typeof value === 'string') {
      const [y, m, d] = value.split('-').map(Number);
      due = new Date(y, m - 1, d);
    } else {
      due = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }
    if (isNaN(due.getTime())) return 'Pas d’échéance';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.round((due.getTime() - today.getTime()) / 86_400_000);

    if (diff === 0) return 'Aujourd’hui';
    if (diff === 1) return 'Demain';
    if (diff > 1) return `Dans ${diff} jours`;
    const late = -diff;
    return `En retard de ${late} ${late === 1 ? 'jour' : 'jours'}`;
  }
}
