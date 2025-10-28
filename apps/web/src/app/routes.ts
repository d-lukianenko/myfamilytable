import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
  {
    path: 'recipes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./recipes/recipe-not-found/recipe-not-found.component').then((m) => m.RecipeNotFoundComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./recipes/recipe-detail/recipe-detail.component').then(
            (m) => m.RecipeDetailComponent
          ),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
