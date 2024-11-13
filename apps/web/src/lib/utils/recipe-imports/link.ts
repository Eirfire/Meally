"use server";
import {
  cleanHtml,
  getHtml,
  getRecipeJsonLd,
  transformRecipe,
} from "@/lib/services/link-parsing";
import logger from "@/lib/services/logger";
import { createClient } from "@mixie/supabase/server";
import { NewRecipe, Recipe } from "@/types";
import * as z from "zod";
import { createRecipeFromText } from "./text";

const schema = z.object({
  user_id: z.string(),
  link: z.string().url(),
});

function isUrl(validUrl: string, url: string): boolean {
  const escapedUrl = validUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^https:\/\/(www\\.)?${escapedUrl}\/`);

  return pattern.test(url);
}

/**
 *
 * @param {string} link - the link to the recipe
 * @param {string} user_id - the user id of the user who is importing the recipe
 * @param {string} html - the html content of the recipe
 * @returns {Recipe} a created recipe object
 */
async function createFromHTML(link: string, user_id: string, html: string) {
  logger.warn(`No recipe could be found using json-ld parsing`, {
    location: "recipe-imports/link",
    message: JSON.stringify({
      link: link,
      user: user_id,
    }),
    statusCode: 404,
  });

  const cleanedHtml = await cleanHtml(html);
  const text = `${cleanedHtml.ogData}\n\n${cleanedHtml.textContent}`;
  const recipe = await createRecipeFromText({
    text,
    user_id: user_id,
  });
  logger.info(`Created recipe from text`, {
    location: "recipe-imports/link",
    message: JSON.stringify({
      link: link,
      user: user_id,
    }),
    statusCode: 200,
  });
  return recipe;
}

/**
 * Creates a recipe from a link by importing it
 */
export const createRecipeFromLink = async (
  params: z.infer<typeof schema>
): Promise<NewRecipe> => {
  const supabase = createClient();
  let newRecipe: NewRecipe;

  if (isUrl("https://www.mixiecooking.com/recipes/", params.link)) {
    // split a mixie link to get the recipe id this id would be after /recipes/<recipe_id> a recipe link might look like this: https://mixiecooking.com/recipes/5f9b1b5e-5b1a-4b9e-9b9e-9b9e9b9e9b9e
    const recipe_id = params.link.split("/").pop();
    if (!recipe_id) throw Error("Recipe ID not found");

    const { data: findRecipe } = await supabase
      .from("recipes")
      .select()
      .or(`id.eq.${recipe_id},recipe_id.eq.${recipe_id}`)
      .single();

    if (!findRecipe) {
      throw Error("Recipe ID not found", { cause: 404 });
    }

    newRecipe = {
      ...(findRecipe as NewRecipe),
    };
  }
  const html = await getHtml(params.link);

  const recipe = await getRecipeJsonLd(html);

  if (!recipe) {
    return await createFromHTML(params.link, params.user_id, html);
  }

  if (!recipe) {
    logger.warn(`No recipe found at ${params.link}`, {
      location: "recipe-imports/link",
      message: JSON.stringify({
        link: params.link,
        user: params.user_id,
      }),
      statusCode: 404,
    });
    throw new Error(`No recipe found at ${params.link}`, { cause: 404 });
  }

  const transform = transformRecipe(recipe);

  newRecipe = {
    ...transform,
    source: params.link,
    public: false,
    created_by: params.user_id,
    recipe_creation_type: "link",
  };

  return newRecipe;
};
