import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { NotificationSliceType, createNotificacionSlice } from "./notificationSlice";

export type FavoriteSliceType = {
	favorites: Recipe[];
	handleClickFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe['idDrink']) => boolean
  loadFromStorage: () => void
};
// Para agregar un slice dentro de otro se agrega en los types de StateCreator lo siguiente:
// Los arreglos vacios significa que no va a tomar parametros adiconales
// <FavoriteSliceType & NotificationSliceType, [], [], FavoriteSliceType>
export const createFavoriteSlice: StateCreator<FavoriteSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
	favorites: [],
	handleClickFavorite: (recipe) => {
    let updatedFavorites : Recipe[]
    let text;
    let error = false;

		if (get().favoriteExist(recipe.idDrink)) {
      updatedFavorites = get().favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
      text = 'Se elimino de favoritos'
    } else {
      updatedFavorites = [...get().favorites, recipe]
      text = 'Se agregó a favoritos'
    }

    createNotificacionSlice(set, get, api).showNotification({text, error})

    set({
      favorites: updatedFavorites
    }),
      localStorage.setItem('favorites', JSON.stringify(get().favorites))
    }
    ,
    favoriteExist: (id) => {
      return get().favorites.some(favorite => favorite.idDrink === id);
    },
    loadFromStorage: () => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        set({
          favorites: JSON.parse(storedFavorites)
        })
      }
    }
});
