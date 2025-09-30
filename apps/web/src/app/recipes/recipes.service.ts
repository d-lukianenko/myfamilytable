import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, finalize, tap, throwError } from 'rxjs';
import { Recipe } from './models/recipe.model';
import { environment } from '../../environments/environment';
import { mapApiRecipe } from './repice.mappers';
import { ApiRecipe } from './models/recipe.api';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private _recipes = signal<Recipe[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  recipes = this._recipes.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  private readonly baseUrl = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) {}

  fetchRecipes(): Observable<Recipe[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<ApiRecipe[]>(this.baseUrl).pipe(
      map((items) => items.map(mapApiRecipe)),
      tap((recipes) => this._recipes.set(recipes)),
      catchError((err) => {
        this._error.set(err?.error?.message ?? 'Failed to load recipes');
        return throwError(() => err);
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
