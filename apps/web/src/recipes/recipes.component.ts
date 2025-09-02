import { Component, inject, Signal } from '@angular/core';
import { RecipesService } from './recipes.service';
import { CommonModule } from '@angular/common';
import { Recipe } from './models/recipe.model';

@Component({
  imports: [CommonModule],
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  private recipesService = inject(RecipesService);

  recipes: Signal<Recipe[]> = this.recipesService.recipes;
  loading = this.recipesService.loading;
  error = this.recipesService.error;

  constructor() {
    this.recipesService.fetchRecipes().subscribe();
  }
}
