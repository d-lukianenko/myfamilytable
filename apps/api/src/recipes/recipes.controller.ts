import { Controller, Get } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipes: RecipesService) {}

  @Get()
  findAll(): RecipeDto[] {
    return this.recipes.findAll();
  }
}
