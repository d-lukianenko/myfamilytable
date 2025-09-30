export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}
export interface RecipeDetail extends Recipe {
  ingredients: string[];
  steps: string[];
  tips: string;
  tags: string[];
}
