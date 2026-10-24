import { TestBed } from '@angular/core/testing';
import { ProjectList } from './project-list';

describe('ProjectList', () => {
  it('charge les projets via le service et filtre selon la recherche', async () => {
    await TestBed.configureTestingModule({ imports: [ProjectList] }).compileComponents();
    const fixture = TestBed.createComponent(ProjectList);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.projects().length).toBeGreaterThanOrEqual(3);
    expect(component.filteredProjects().length).toBe(component.projects().length);

    component.searchTerm.set('mobile');
    expect(component.filteredProjects().map((p) => p.name)).toEqual(['Application mobile']);

    component.searchTerm.set('zzz');
    expect(component.filteredProjects()).toEqual([]);
  });
});
