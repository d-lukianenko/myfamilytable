export interface ApiRecipe {
  id: string;
  title: string;
  description: string;
  imagePublicId: string;
}
export interface ApiRecipeDetail extends ApiRecipe {
  ingredients: string[];
  steps: string[];
  tips: string;
  tags: string[];
}
