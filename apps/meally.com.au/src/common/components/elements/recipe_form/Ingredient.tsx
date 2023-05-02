import { TrashIcon } from '@heroicons/react/24/outline';
import styles from './Form.module.scss';
import { units } from '@lib/service/data';
import { useFormContext } from 'react-hook-form';
import { Ingredient, Recipe } from 'libs/types';

interface IngredientProps {
  index: number;
  values: Ingredient;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, values, handleDelete }: IngredientProps) => {
  const { register, getValues, watch } = useFormContext<Recipe>();
  const activeUnit = getValues(`ingredients.${index}.unit`);

  return (
    <section
      key={index}
      className={`${styles.ingredient} dark:bg-dark_grey dark:shadow-none shadow-main dark:text-white text-black bg-white rounded-md`}
    >
      <input
        {...register(`ingredients.${index}.ingredient`)}
        type="text"
        placeholder="ingredient"
        defaultValue={getValues(`ingredients.${index}.ingredient`)}
        className="w-50 h-10 rounded-md p-2 text-step--3 dark:outline-none outline outline-1"
      />
      <select
        id={`ingredients.${index}.unit`}
        className="dark:outline-none outline outline-1"
        defaultValue={getValues(`ingredients.${index}.unit`)}
        {...register(`ingredients.${index}.unit`)}
      >
        {units.map((unit, index) => {
          return (
            <option value={unit} key={index}>
              {unit}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        placeholder="quantity"
        defaultValue={values.quantity}
        {...register(`ingredients.${index}.quantity`, { min: 0 })}
        className="w-20 h-10 rounded-md p-2 text-step--4 dark:outline-none outline outline-1"
      />
      {['cup', 'tbsp', 'tsp'].includes(watch(`ingredients.${index}.unit`)) ? (
        <>
          <select
            id="measurement"
            defaultValue={values.measurement}
            className="dark:outline-none outline outline-1"
            {...register(`ingredients.${index}.measurement`)}
            // value={value.split('|')[1]?.trim().split(' ')[1] || cupSelect}
            // onChange={(event: any) => setCupSelect(event.target.value)}
          >
            <option value=""></option>
            <option value="1/2">1/2 {}</option>
            <option value="1/2">1/3 {activeUnit}</option>
            <option value="1/2">2/3 {activeUnit}</option>
            <option value="1/4">1/4 {activeUnit}</option>
            <option value="3/4">3/4 {activeUnit}</option>
          </select>
        </>
      ) : (
        <></>
      )}

      <button onClick={() => handleDelete(index)} type="button">
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Ingredient };
