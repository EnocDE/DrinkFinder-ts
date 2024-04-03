import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schemas/recipes-schema";
import { Drink, SearchFiler } from "../types";

const urlAPIBase = 'https://www.thecocktaildb.com/api/json/v1/1'

export async function getCategories() {
	const url = `${urlAPIBase}/list.php?c=list`;
	const { data } = await axios(url);
	const result = CategoriesAPIResponseSchema.safeParse(data);
  if (result.success) {
    return result.data
  }
}

export async function getRecipes(filters : SearchFiler) {
  const url = `${urlAPIBase}/filter.php?c=${filters.category}&i=${filters.ingredient}`;
	const { data } = await axios(url);
  const result = DrinksAPIResponse.safeParse(data)
  if (result.success) {
    return result.data
  }
}

export async function getRecipesById(id : Drink['idDrink']) {
  const url = `${urlAPIBase}/lookup.php?i=${id}`;
	const { data } = await axios(url);
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  if (result.success) {
    return result.data
  }
}