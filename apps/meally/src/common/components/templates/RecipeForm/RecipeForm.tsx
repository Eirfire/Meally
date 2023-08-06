'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Input } from '@components/ui/input';
import { Ingredient, Recipe, amount } from '@/src/db/types';
import { Textarea } from '../../ui/textarea';

import {
  dietaryRequirements,
  meal_times,
  sweet_savoury,
} from '@lib/services/data';
import { IngredientContainer } from './IngredientContainer';
import { StepContainer } from './StepContainer';
import { recipeFormSchema } from '@/src/db/zodSchemas';
import TagInput from '../../ui/taginput';
import ImageUpload from './ImageUpload';
import RecipeService from '@/src/common/lib/services/RecipeService';
import { toast } from '../../ui/use-toast';
import { type } from 'os';
import Overlay from './Overlay';

interface RecipeFormProps {
  recipe: any | Recipe; //TODO: fix this type to represent the correct type of recipe (not a huge deal but would be useful)
}

/**
 * The form for creating and editing recipes
 * @param {Recipe} recipe - the recipe to be edited
 * @returns {React.JSX.Element} - the recipe form
 */
const RecipeForm = ({ recipe }: RecipeFormProps) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const methods = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      // apply the recipe values if they exist using something like ...recipe
      ...recipe,
      ingredients: recipe?.ingredients || [
        {
          title: '',
          unit: 'grams',
          quantity: null,
          isHeading: false,
          amount: 'not_set',
        },
      ],
      steps: recipe?.steps || [{ step_body: '' }],
    },
  });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = methods;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  const onSubmit = async (recipe: any) => {
    console.log('Recipe: ', recipe);
    if (!recipe) return;
    //TODO: fix this so it will override the current ingredients on the recipe with the new ones
    const ingredients = recipe?.ingredients?.map((ingredient: Ingredient) => {
      if (!['cup', 'tbsp', 'tsp'].includes(ingredient?.unit || '')) {
        ingredient.amount = amount.not_set;
      }
      // check if the quanity is a number if not then set the value to null
      if (typeof ingredient.quantity != 'number') {
        ingredient.quantity = null;
      }

      return ingredient;
    });
    const data = {
      ...recipe,
      ingredients,
    };
    console.log('Data: ', data);
    // send data to edit the recipe in the db
    await fetch(`/api/recipes/${recipe.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: 'Recipe created.',
          description: 'Your recipe has been created.',
        });
      } else {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was an error while creating your recipe.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/2 mx-auto p-2 md:p-0 mb-[20%]"
      >
        <Overlay />
        <button type="button" onClick={() => console.log(getValues())}>
          get values
        </button>
        <Input
          {...register('title', {
            required: true,
          })}
          required
          label="Title"
        />
        <Textarea id="description" label="Description" control={control} />
        <Input
          {...register('info.prep')}
          label="Prep Time"
          hint="Must be in the format 4h 3m 4s where h = hours, m = mintues, s = seconds"
        />
        <Input
          {...register('info.cook')}
          label="Cook Time"
          hint="Must be in the format 4h 3m 4s where h = hours, m = mintues, s = seconds"
        />
        {/* <Input
          {...register('info.serves', { valueAsNumber: true, min: 0 })}
          error={errors.info?.serves}
          label="Serves"
          type="number"
        /> */}

        <Controller
          control={control}
          name="dietary"
          render={({ field }) => (
            <>
              <label
                htmlFor="dietary"
                className="block text-step--3 font-medium"
              >
                Dietary Requirements
              </label>
              <Select
                name="dietary"
                defaultValue={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-2/3 text-step--2">
                  <SelectValue placeholder="Dietary Requirements" />
                </SelectTrigger>
                <SelectContent>
                  {dietaryRequirements.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <TagInput
          control={control}
          name="contains"
          // label='Contains'
          placeholder="E.g gluten, dairy, nuts"
          hint="Allergens (separated by a comma)"
        />

        <Controller
          control={control}
          name="sweet_savoury"
          render={({ field }) => (
            <>
              <label
                htmlFor="sweet_savoury"
                className="block text-step--3 font-medium"
              >
                Sweet or Savoury
              </label>
              <Select
                name="sweet_savoury"
                defaultValue={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-2/3 text-step--2">
                  <SelectValue placeholder="Sweet or Savoury" />
                </SelectTrigger>
                <SelectContent>
                  {sweet_savoury.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <ImageUpload />

        <Controller
          control={control}
          name="mealTime"
          render={({ field }) => (
            <>
              <label
                htmlFor="mealTime"
                className="block text-step--3 font-medium"
              >
                Meal Time
              </label>
              <Select
                name="mealTime"
                defaultValue={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-2/3 text-step--2">
                  <SelectValue placeholder="Meal time" />
                </SelectTrigger>
                <SelectContent>
                  {meal_times.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <TagInput
          name="info.keywords"
          control={control}
          placeholder="Keywords (separated by a comma)"
          hint="Keywords will be used to help users find your recipe."
        />

        <section className="flex flex-row flex-wrap gap-4 mb-8">
          <IngredientContainer />
          <StepContainer />
        </section>
        <Textarea
          id="notes"
          control={control}
          label="Notes, Tips or Suggestions"
        />
        <Button
          type="submit"
          ariaLabel="Submit Recipe"
          className="text-step--1 mt-14 mb-3  border rounded-lg"
          // disabled={!isDirty || !isValid}
          // onClick={() => console.log(getValues())}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
