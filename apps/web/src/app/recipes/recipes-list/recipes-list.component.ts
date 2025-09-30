import { Component, inject, Signal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.comopent.html',
  imports: [RecipeCardComponent],
})
export class RecipesListComponent {
  private recipesService = inject(RecipesService);

  recipes: Signal<Recipe[]> = this.recipesService.recipes;
  loading = this.recipesService.loading;
  error = this.recipesService.error;

  constructor() {
    this.recipesService.fetchRecipes().subscribe();
  }
}
