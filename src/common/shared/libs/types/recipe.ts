import { Timestamp } from 'firebase/firestore';

// Generated by https://quicktype.io
// honestly quicktype extension in vscode is great if your not sure of the json objects types

export interface Recipe {
  id: string;
  imageUrl: string;
  recipeName: string;
  recipeDescription: string;
  keywords: string[];
  ingredients: string[];
  dietary: string[];
  Allergens: string[];
  sweet_savoury: string;
  meallyTime: string[];
  version: string;
  createdBy: string;
  createdAt: string;
  info: Info;
  steps: string[];
  madeRecipe: number;
  savedRecipe: number;
}

export interface Info {
  total: string;
  prep: string;
  cook: string;
  serves: number;
  rating: number;
}

