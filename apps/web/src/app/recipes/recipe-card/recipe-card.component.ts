import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.component.html',
  imports: [RouterLink]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
