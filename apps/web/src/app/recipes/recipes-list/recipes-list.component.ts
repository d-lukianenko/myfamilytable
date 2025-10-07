import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../models/recipe.model';
import { RecipeCardLoadingComponent } from '../recipe-card-loading/recipe-card-loading.component';
import { RecipesStore } from '../recipes.store';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.comopent.html',
  imports: [RecipeCardComponent, RecipeCardLoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RecipesListComponent implements OnInit {
  private recipeStore = inject(RecipesStore);

  recipes: Signal<Recipe[]> = this.recipeStore.recipes;
  isLoading: Signal<boolean> = this.recipeStore.listLoading;
  skeletons: number[] = [0,1,2,3,4,5];

  ngOnInit() {
    this.recipeStore.loadAll();
  }
}
