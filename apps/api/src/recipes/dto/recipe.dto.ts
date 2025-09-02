import { IsString } from 'class-validator';

export class RecipeDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
