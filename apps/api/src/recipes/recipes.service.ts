import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeDetailDto, RecipeListDto } from './dto/recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { toRecipeDetailDto, toRecipeListDto } from './recipes.mapper';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<RecipeListDto[]> {
    const recipes = await this.prisma.recipe.findMany({orderBy: { createdAt: 'desc' }});
    return recipes.map((r) => toRecipeListDto(r));
  }

  async findOne(id: string): Promise<RecipeDetailDto> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return toRecipeDetailDto(recipe);
  }
}
