import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from './models/recipe.model';
import { environment } from '../../environments/environment';
import { mapApiRecipe, mapApiRecipeDetail } from './recipe.mappers';
import { ApiRecipe, ApiRecipeDetail } from './models/recipe.api';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly baseUrl = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) { }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<ApiRecipe[]>(this.baseUrl).pipe(map(recipes => recipes.map(mapApiRecipe)));
  }

  fetchRecipeById(id: string) {
    return this.http.get<ApiRecipeDetail>(`${this.baseUrl}/${id}`).pipe(map(mapApiRecipeDetail));
  }
}
