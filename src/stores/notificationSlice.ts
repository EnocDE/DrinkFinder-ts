import { StateCreator } from "zustand";
import { FavoriteSliceType } from "./favoriteSlice";

type Notificacion = {
	text: string;
	error: boolean;
	show: boolean;
};

export type NotificationSliceType = {
	notification: Notificacion;
	showNotification: (payload: Pick<Notificacion, "text" | "error">) => void;
  closeNotification: () => void
};

export const createNotificacionSlice: StateCreator< NotificationSliceType & FavoriteSliceType, [], [], NotificationSliceType> = (set, get) => ({
	notification: {
		text: "",
		error: false,
		show: false,
	},
	showNotification: (payload) => {
		set({
			notification: {
				text: payload.text,
				error: payload.error,
				show: true,
			},
		});
    setTimeout(() => {
      get().closeNotification()
    }, 5000)
	},
	closeNotification: () => {
		set((state) => ({
			notification: {...state.notification, show: false}
		}));
	},
});
