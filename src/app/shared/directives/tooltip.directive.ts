import { Directive, ElementRef, HostListener, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  appTooltip = input<string>('');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipSpan: HTMLElement | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipSpan) return;
    const text = this.appTooltip();
    if (!text) return;

    this.tooltipSpan = this.renderer.createElement('span');
    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(this.tooltipSpan, textNode);

    this.renderer.addClass(this.tooltipSpan, 'block');
    this.renderer.addClass(this.tooltipSpan, 'text-xs');
    this.renderer.addClass(this.tooltipSpan, 'text-gray-500');
    this.renderer.addClass(this.tooltipSpan, 'italic');

    this.renderer.appendChild(this.el.nativeElement, this.tooltipSpan);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipSpan) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipSpan);
      this.tooltipSpan = null;
    }
  }
}
