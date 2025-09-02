import { Component, signal } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('myfamilytable');
}
