import { Controller, Get, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeListDto } from './dto/recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Get()
  async findAll(): Promise<RecipeListDto[]> {
    return this.recipesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RecipeListDto> {
    return this.recipesService.findOne(id);
  }
}
