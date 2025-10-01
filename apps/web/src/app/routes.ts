import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
  {
    path: 'recipes',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'recipes/:id',
    loadComponent: () => import('./recipes/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent),
  },
  { path: '**', redirectTo: '' }
];
