import { z } from "zod";

 // Schema for validating the ingredients payload in the request. Ensures that ingredients is a non-empty array of strings.
export const IngredientsSchema = z.object({
  ingredients: z.array(z.string()).min(1),
});

// Type inferred from IngredientsSchema for TypeScript typing.
export type IngredientsPayload = z.infer<typeof IngredientsSchema>;

// Schema for validating the response containing the recipe. Ensures recipe is a string.
export const RecipeResponseSchema = z.object({
  recipe: z.string(),
});

 // Type inferred from RecipeResponseSchema for TypeScript typing.
export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;
