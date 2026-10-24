import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  /** Couleur de fond au survol (jaune clair par défaut). */
  appHighlight = input('');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private originalColor = '';

  @HostListener('mouseenter')
  onEnter(): void {
    this.originalColor = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = this.appHighlight() || '#fef9c3';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalColor;
  }
}
