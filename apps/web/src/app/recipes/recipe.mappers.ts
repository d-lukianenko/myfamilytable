import { ApiRecipe, ApiRecipeDetail } from './models/recipe.api';
import { Recipe, RecipeDetail } from './models/recipe.model';
import { cldUrl } from '../../shared/cloudinary';

export function mapApiRecipe(r: ApiRecipe): Recipe {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imageUrl: cldUrl(r.imagePublicId),
    imageAlt: r.title,
    tags: r.tags
  };
}

export function mapApiRecipeDetail(r: ApiRecipeDetail): RecipeDetail {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imageUrl: cldUrl(r.imagePublicId),
    imageAlt: r.title,
    tags: r.tags,
    ingredients: r.ingredients,
    steps: r.steps,
    tips: r.tips
  };
}
