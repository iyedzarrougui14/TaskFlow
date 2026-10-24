import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `<div [appTooltip]="tooltipText">Test element</div>`,
  imports: [TooltipDirective],
})
class TestHostComponent {
  tooltipText = 'Description complète de la tâche';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    hostEl = fixture.debugElement.query(By.css('div')).nativeElement;
  });

  it('crée la bulle span au survol (mouseenter) et la supprime à la sortie (mouseleave)', () => {
    expect(hostEl.querySelector('span')).toBeNull();

    // Mouse enter
    hostEl.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const span = hostEl.querySelector('span');
    expect(span).not.toBeNull();
    expect(span?.textContent).toBe('Description complète de la tâche');

    // Mouse leave
    hostEl.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(hostEl.querySelector('span')).toBeNull();
  });
});
