import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Recipe } from './models/recipe.model';
import { environment } from '../environments/environment';

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

    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      tap((data) => this._recipes.set(data)),
      catchError((err) => {
        console.error('Failed to fetch recipes', err);
        this._error.set('Failed to fetch recipes');
        return throwError(() => err);
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
