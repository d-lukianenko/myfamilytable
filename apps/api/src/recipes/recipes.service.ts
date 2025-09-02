import { Injectable } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {
  findAll(): RecipeDto[] {
    return [
      {
        id: 'r1',
        title: 'Banana Mini Pancakes',
        description:
          'Fluffy 2-ingredient pancakes made with just banana and egg',
      },
    ];
  }
}
