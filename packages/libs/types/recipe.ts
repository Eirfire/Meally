import { Timestamp } from "firebase/firestore";

// Generated by https://quicktype.io
// honestly quicktype extension in vscode is great if your not sure of the json objects types

export interface Recipe {
  id: string;
  image: ImageProps;
  recipeName: string;
  recipeDescription: string;
  info: Info;
  ingredients: Ingredient[];
  steps: Step[];
  keywords: string[];
  dietary: { value: string; label: string }[];
  allergens: { value: string; label: string }[];
  sweet_savoury: string;
  mealTime: string[];
  version: string;
  createdBy: UserInfo;
  createdAt: Timestamp;
  lastUpdated: Timestamp;
  lastUpdatedBy: string;
  madeRecipe: number;
  savedRecipe: number;
}

export interface Info {
  total: string;
  prep: string;
  cook: string;
  serves: number | undefined;
  rating: number;
}

export interface Step {
  step_body: string;
}

export interface Ingredient {
  ingredient: string;
  unit: string;
  quantity: number | undefined;
  measurement?: string;
}

export interface ImageProps {
  imgUrl: string;
  imgAlt: string;
}

export interface UserInfo {
  uid: string;
  email?: string;
  phoneNumber?: string;
  displayName: string;
}
