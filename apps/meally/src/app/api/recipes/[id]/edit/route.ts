import { recipeId } from '@/src/common/lib/utils';
import { db } from '@/src/db';
import { authOptions } from '@/src/db/next-auth-adapter';
import { recipes, info } from '@/src/db/schemas';
import {
  Ingredient,
  NewRecipe,
  NewPartialRecipe,
  NewInfo,
} from '@/src/db/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import * as z from 'zod';
import { recipeFormSchema } from '@/src/db/zodSchemas';
import { eq } from 'drizzle-orm';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 403 });
  }
  const { user } = session;

  const json = await req.json();
  json.createdAt = new Date(json.createdAt);
  json.lastUpdated = new Date(json.lastUpdated);
  // console.log('Recipe sent to server: ', json);
  const recipe = recipeFormSchema.parse(json);

  // get all ingredients and set them to the info, only include ingredients that have isHeading set to false

  const ingredients = recipe?.ingredients
    ?.filter((ingredient) => !ingredient.isHeading && ingredient.title)
    .map((ingredient) => ingredient.title);
  console.log('Ingredients: ', ingredients);
  console.log('Ingredients table updated');

  // create the json schema for the steps
  const steps = recipe?.steps?.map((step) => {
    return step;
  });

  // update info table
  const newInfo: NewInfo = {
    recipeId: recipe.uid,
    id: recipeId(recipe.title) || recipe.id,
    title: recipe.title,
    keywords: recipe?.info?.keywords || null,
    ingredients: ingredients || null,
    prep: recipe?.info?.prep || null,
    cook: recipe?.info?.cook || null,
    total: recipe?.info?.total || null,
    createdBy: recipe.info?.createdBy || user.id,
    createByName: recipe.info?.createByName || user.name || '',
    lastUpdatedBy: user.id,
    lastUpdatedByName: user.name || '',
  };
  console.log('Info: ', newInfo);
  await db.update(info).set(newInfo).where(eq(info.recipeId, recipe.uid));
  console.log('Info table updated');

  // remove the info from the recipe as it's been set on another table
  delete recipe.info;
  console.log('Recipe now: ', recipe);

  // define the new recipe
  console.log('Start creating new recipe');
  const newRecipe: NewPartialRecipe = {
    ...recipe,
    // id: ,
    id: recipeId(recipe.title) || recipe.id,
    steps: steps,
    createdBy: recipe.createdBy,
    lastUpdatedBy: user.id,
  };
  console.log('new recipe being set: ', newRecipe);

  const setRecipe = await db
    .update(recipes)
    .set(newRecipe)
    .where(eq(recipes.uid, recipe.uid));
  console.log('Created Recipe', setRecipe);
  return NextResponse.json(
    { message: `Recipe successfully created, ${setRecipe}`, recipe: newRecipe },
    {
      status: 200,
    }
  );
}
