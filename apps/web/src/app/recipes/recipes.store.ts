import { inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, finalize, throwError } from 'rxjs';
import { RecipesService } from './recipes.service';
import { Recipe, RecipeDetail } from './models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesStore {
    private recipesService = inject(RecipesService);

    private _recipes = signal<Recipe[]>([]);
    private _listLoading = signal(false);
    private _listError = signal<{ code: number; message: string } | null>(null);

    private _selected = signal<RecipeDetail | null>(null);
    private _detailLoading = signal(false);
    private _detailError = signal<{ code: number; message: string } | null>(null);

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
            catchError(err => {
                const code = err.status ?? 0;
                const message =
                    code === 404 ? 'Recipe not found' : 'Failed to load recipe';
                this._detailError.set({ code, message });
                this._selected.set(null);
                return EMPTY;
            }),
            finalize(() => this._detailLoading.set(false))
        ).subscribe(recipe => this._selected.set(recipe));
    }

    private handleErr(err: unknown, fallback: string, scope: 'list' | 'detail') {
        let code = 0;
        let message = fallback;

        if (err instanceof HttpErrorResponse) {
            code = err.status;
            message =
                (err.error?.message as string) ??
                (code === 404 ? 'Recipe not found' : `${fallback} (status ${code})`);
        }

        const errorObj = { code, message };

        if (scope === 'list') {
            this._listError.set(errorObj);
        } else {
            this._detailError.set(errorObj);
        }

        return throwError(() =>
            err instanceof Error ? err : new Error(message)
        );
    }
}
