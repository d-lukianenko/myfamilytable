import { Component } from '@angular/core';
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.comopent.html',
  imports: [RecipeCardComponent],
})
export class RecipesListComponent {}
