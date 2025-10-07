import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipeDetail } from '../models/recipe.model';
import { RecipeDetailLoadingComponent } from '../recipe-detail-loading/recipe-detail-loading.component';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    templateUrl: './recipe-detail.component.html',
    imports: [RouterLink, RecipeDetailLoadingComponent]
})
export class RecipeDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private recipesService = inject(RecipesService);

    recipe = signal<RecipeDetail | null>(null);
    loading = signal(false);
    error = signal<string | null>(null);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id') ?? '';
        this.loading.set(true);
        this.error.set(null);
        this.recipesService.fetchRecipeById(id).pipe(
            catchError(err => {
                this.error.set(err?.error?.message ?? 'Failed to load recipe');
                return of(null);
            }),
            finalize(() => this.loading.set(false))
        ).subscribe(r => this.recipe.set(r));
    }
}
