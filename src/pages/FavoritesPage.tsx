import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritesPage() {
	const { favorites } = useAppStore();
	const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

	return (
		<div className="w-[90%] mx-auto">
			<h1 className="text-6xl font-extrabold">Favoritos</h1>

			<div className="mt-5 grid grid-cols-automatic gap-4">
				{hasFavorites
					? favorites.map((drink) => (
							<DrinkCard key={drink.idDrink} drink={drink} />
					  ))
					: <p className="text-xl">Aún no has agregado favoritos</p>}
			</div>
		</div>
	);
}
