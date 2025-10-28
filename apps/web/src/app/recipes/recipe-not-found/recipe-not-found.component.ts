import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-recipe-not-found',
    templateUrl: './recipe-not-found.component.html',
    imports: [RouterLink]
})
export class RecipeNotFoundComponent { }
