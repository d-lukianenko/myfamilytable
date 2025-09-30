import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
