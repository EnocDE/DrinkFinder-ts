import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

export default function IndexPage() {
	const { drinks } = useAppStore();
	const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);

	return (
		<div className="w-[90%] mx-auto">
			<h1 className="text-6xl font-extrabold">Recetas</h1>
			<div className="mt-5 grid grid-cols-automatic gap-4">
				{hasDrinks
					? drinks.drinks.map((drink) => (
							<DrinkCard key={drink.idDrink} drink={drink} />
					  ))
					: <p className="text-xl">Aún no has hecho ninguna busqueda</p>}
			</div>
		</div>
	);
}
