import { Injectable } from '@nestjs/common';
import { RecipeListDto } from './dto/recipe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { toRecipeListDto } from './recipes.mapper';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RecipeListDto[]> {
    const recipes = await this.prisma.recipe.findMany();
    return recipes.map((r) => toRecipeListDto(r));
  }
}
