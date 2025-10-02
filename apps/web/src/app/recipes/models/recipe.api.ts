export interface ApiRecipe {
  id: string;
  title: string;
  description: string;
  imagePublicId: string;
  tags: string[];
}
export interface ApiRecipeDetail extends ApiRecipe {
  ingredients: string[];
  steps: string[];
  tips: string;
}
