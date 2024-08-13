"use server";
import { recipeId } from "@/lib/utils";
import { constructJsonSchemaPrompt } from "@/lib/utils/ai-convert/zod-to-json";
import { googleGenAi } from "@/lib/server/ai/google_ai";
import { ratelimit } from "@/lib/server/kv";
import {
  difficulty_level,
  image_attributesSchema,
  ingredientSchema,
  NewRecipe,
  recipe_creation_type,
  recipeSchema,
  selectValue,
  stepSchema,
  sweet_savoury,
} from "@/types";
import { safeParseJSON } from "@ai-sdk/provider-utils";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import logger from "@/lib/services/logger";
import { openAI } from "@/lib/server/ai/open_ai";

const schema = z.object({
  user_id: z.string(),
  image: z.string().base64(),
});

const recipeImportSchemaAI = recipeSchema.pick({
  category: true,
  title: true,
  cook_time: true,
  prep_time: true,
  ingredients: true,
  steps: true,
  keywords: true,
  description: true,
  cuisine: true,
  sweet_savoury: true,
  yield: true,
  meal_time: true,
  notes: true,
  difficulty_level: true,
  suitable_for_diet: true,
});
// .extend({
//   category: z.string().array().nullable(),
//   cook_time: z.number().nullable(),
//   cuisine: z.string().array().nullable(),
//   description: z.string().nullable(),
//   difficulty_level: difficulty_level.default("not_set").nullable(),
//   ingredients: ingredientSchema.array().nullable(),
//   keywords: z.string().array().nullable(),
//   meal_time: selectValue.array().nullable(),
//   notes: z.string().nullable(),
//   prep_time: z.number().nullable(),
//   recipe_creation_type: recipe_creation_type.default("title").nullable(),
//   steps: stepSchema.array().nullable(),
//   suitable_for_diet: z.string().nullable(),
//   sweet_savoury: sweet_savoury.default("not_set").nullable(),
//   yield: z.number().nullable(),
// });

export const createRecipeFromImage = async (
  params: z.infer<typeof schema>
): Promise<NewRecipe> => {
  const { success } = await ratelimit.limit(params.user_id);

  if (!success) {
    logger.warn(`Limit was exceeded for ${params.user_id}`, {
      location: "recipe-imports/image",
    });
    throw new Error("Limit exceeded, wait a little bit before creating again", {
      cause: 429,
    });
  }

  const { object } = await generateObject({
    model: openAI("gpt-4o-mini-2024-07-18"),
    schemaName: "Recipe",
    schemaDescription:
      "Extract the recipe in the image if not a recipe then return null",
    schema: recipeImportSchemaAI,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Extract the recipe in the image",
          },
          {
            type: "image",
            image: params.image,
          },
        ],
      },
    ],
  });

  const newRecipe: NewRecipe = {
    ...object,
    id: recipeId(object.title),
    created_by: params.user_id,
    version: "1.0",
    recipe_creation_type: "image",
  };

  return newRecipe;
};
