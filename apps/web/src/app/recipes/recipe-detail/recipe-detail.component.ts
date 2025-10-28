import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private router = inject(Router);
    private recipeStore = inject(RecipesStore);

    loading: Signal<boolean> = this.recipeStore.detailLoading;
    recipe: Signal<RecipeDetail | null> = this.recipeStore.selected;
    error: Signal<{ code: number; message: string } | null> = this.recipeStore.detailError;

    private redirectOn404 = effect(() => {
        const err = this.error();
        if (err?.code === 404 && this.router.url !== '/recipes/not-found') {
            this.router.navigate(['/recipes/not-found']);
        }
    });

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.recipeStore.loadById(id);
    }
}
