import { Recipe } from '@prisma/client';
import { RecipeListDto } from './dto/recipe.dto';

export function toRecipeListDto(r: Recipe): RecipeListDto {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imagePublicId: r.imagePublicId,
  };
}
