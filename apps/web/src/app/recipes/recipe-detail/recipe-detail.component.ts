import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeDetail } from '../models/recipe.model';
import { RecipeDetailLoadingComponent } from '../recipe-detail-loading/recipe-detail-loading.component';
import { RecipesStore } from '../recipes.store';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    templateUrl: './recipe-detail.component.html',
    imports: [RouterLink, RecipeDetailLoadingComponent]
})
export class RecipeDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private recipeStore = inject(RecipesStore);

    loading: Signal<boolean> = this.recipeStore.detailLoading;
    recipe: Signal<RecipeDetail | null> = this.recipeStore.selected;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.recipeStore.loadById(id);
    }
}
