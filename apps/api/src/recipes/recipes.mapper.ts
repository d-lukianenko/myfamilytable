import { Recipe } from '@prisma/client';
import { RecipeDetailDto, RecipeListDto } from './dto/recipe.dto';

export function toRecipeListDto(r: Recipe): RecipeListDto {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imagePublicId: r.imagePublicId,
    tags: r.tags
  };
}

export function toRecipeDetailDto(r: Recipe): RecipeDetailDto {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imagePublicId: r.imagePublicId,
    tags: r.tags,
    ingredients: r.ingredients,
    steps: r.steps,
    tips: r.tips
  };
}

