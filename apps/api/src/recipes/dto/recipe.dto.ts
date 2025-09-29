import { IsString, IsOptional, IsArray } from 'class-validator';

export class RecipeListDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  imagePublicId: string;
}

export class RecipeDetailDto extends RecipeListDto {
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @IsArray()
  @IsString({ each: true })
  tips: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
