import { StateCreator } from "zustand";
import { getCategories, getRecipes, getRecipesById } from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFiler } from "../types";

export type RecipesSliceType = {
	categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe,
  modal: boolean,
	fetchCategories: () => Promise<void>;
  searchRecipes: (SearchFilters: SearchFiler) => Promise<void>,
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
  closeModal: () => void
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
	categories: { 
    drinks: []
  },
  drinks: {
    drinks: []
  },
  modal: false,
  selectedRecipe: {} as Recipe,
	fetchCategories: async () => {
		const categories = await getCategories();
		set(() => ({
			categories,
		}));
	},
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set(() => ({
      drinks
    }))
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipesById(id);
    if (selectedRecipe) {
      set(() => ({
        modal: true
      }))
    }
    set(() => ({
      selectedRecipe,
    }))
  },
  closeModal: () => {
    set(() => ({
      modal: false
    }))
  }
});
