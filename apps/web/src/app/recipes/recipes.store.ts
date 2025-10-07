import { inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { RecipesService } from './recipes.service';
import { Recipe, RecipeDetail } from './models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesStore {
    private recipesService = inject(RecipesService);

    private _recipes = signal<Recipe[]>([]);
    private _listLoading = signal(false);
    private _listError = signal<string | null>(null);

    private _selected = signal<RecipeDetail | null>(null);
    private _detailLoading = signal(false);
    private _detailError = signal<string | null>(null);

    readonly recipes = this._recipes.asReadonly();
    readonly listLoading = this._listLoading.asReadonly();
    readonly listError = this._listError.asReadonly();
    readonly selected = this._selected.asReadonly();
    readonly detailLoading = this._detailLoading.asReadonly();
    readonly detailError = this._detailError.asReadonly();

    loadAll() {
        this._listLoading.set(true);
        this._listError.set(null);
        this.recipesService.fetchRecipes().pipe(
            catchError(err => this.handleErr(err, 'Failed to load recipes', 'list')),
            finalize(() => this._listLoading.set(false))
        ).subscribe(recipes => this._recipes.set(recipes));
    }

    loadById(id: string) {
        this._detailLoading.set(true);
        this._detailError.set(null);
        this.recipesService.fetchRecipeById(id).pipe(
            catchError(err => this.handleErr(err, 'Failed to load recipe', 'detail')),
            finalize(() => this._detailLoading.set(false))
        ).subscribe(recipe => this._selected.set(recipe));
    }

    private handleErr(err: unknown, fallback: string, scope: 'list' | 'detail') {
        const msg = err instanceof HttpErrorResponse
            ? (err.error?.message as string) ?? `${fallback} (status ${err.status})`
            : fallback;
        scope === 'list' ? this._listError.set(msg) : this._detailError.set(msg);
        return throwError(() => err instanceof Error ? err : new Error(msg));
    }
}
