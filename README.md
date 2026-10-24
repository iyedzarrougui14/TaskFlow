# TaskFlow (TP 3 : Pipes et Directives)

Angular 22, standalone components, Tailwind CSS 4, Signals, RxJS.

## Run

```bash
npm install
npm start        # then open http://localhost:4200
```

Requires Node.js ^22.22.3, ^24.15.0 or >=26 (Angular 22 requirement).

## Structure

```
src/app/
├── core/services/project.service.ts      getProjects(): Observable<Project[]> using of()
├── shared/components/empty-state/        reusable "no result" block
└── features/projects/
    ├── models/                           task.model.ts, project.model.ts
    ├── data/projects.data.ts             PROJECTS (4 projects)
    └── components/
        ├── project-list/                 signals, computed filter, [(ngModel)], subscribe()
        ├── project-card/                 input.required(), output(), (click)
        └── task-list/                    input.required(), @if / @for, status styles
```

## TP 3 additions

- `shared/pipes/` : TruncatePipe, InitialsPipe, DeadlinePipe
- `shared/directives/` : HighlightDirective (`[appHighlight]`)
- French locale registered in `app.config.ts`
- Models/data enriched: Task.dueDate/description, Project.startDate/budget
