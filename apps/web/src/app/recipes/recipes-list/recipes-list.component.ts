import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../models/recipe.model';
import { RecipeCardLoadingComponent } from '../recipe-card-loading/recipe-card-loading.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.comopent.html',
  imports: [RecipeCardComponent, RecipeCardLoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RecipesListComponent implements OnInit {
  private recipesService = inject(RecipesService);

  recipes: Signal<Recipe[]> = this.recipesService.recipes;
  isLoading = this.recipesService.loading;
  skeletons = [0,1,2,3,4,5];

  ngOnInit() {
    this.recipesService.fetchRecipes().subscribe();
  }
}
