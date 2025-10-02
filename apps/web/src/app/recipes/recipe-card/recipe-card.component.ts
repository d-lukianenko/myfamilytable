import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe.model';
import { getTagClasses } from '../../../shared/tag.util';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  templateUrl: './recipe-card.component.html',
  imports: [RouterLink, CommonModule]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  protected readonly getTagClasses = getTagClasses;
}
