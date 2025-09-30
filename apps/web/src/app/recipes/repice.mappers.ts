import { ApiRecipe } from './models/recipe.api';
import { Recipe } from './models/recipe.model';
import { cldUrl } from '../../shared/cloudinary';

export function mapApiRecipe(r: ApiRecipe): Recipe {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imageUrl: cldUrl(r.imagePublicId),
    imageAlt: r.title,
  };
}
