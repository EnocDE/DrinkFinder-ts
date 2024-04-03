import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { FavoriteSliceType, createFavoriteSlice } from "./favoriteSlice";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { NotificationSliceType, createNotificacionSlice } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>()(
	devtools((...a) => ({
		...createRecipesSlice(...a), // se agrega el slice y se le pasan los parametros set, get y api
		...createFavoriteSlice(...a),
		...createNotificacionSlice(...a),
	}))
);
