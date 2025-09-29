import { Component } from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [IntroComponent, RecipesListComponent],
})
export class HomeComponent {}
