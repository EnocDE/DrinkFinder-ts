import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type DrinkCardProps = {
	drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
	const { selectRecipe } = useAppStore();
	return (
		<div className="border shadow rounded-2xl overflow-hidden">

			<div className="overflow-hidden rounded-2xl">
				<img
					className="hover:scale-110 transition-transform"
					src={drink.strDrinkThumb}
					alt={`Imagen bebida ${drink.strDrink}`}
          />
			</div>

			<div className="p-5">
				<h2 className="text-2xl truncate font-bold">{drink.strDrink}</h2>
				<button
					type="button"
					className="bg-orange-400 hover:bg-orange-500 transition-colors text-white p-3 mt-5 w-full font-bold text-lg"
          onClick={() => selectRecipe(drink.idDrink)}
          >
					Ver receta
				</button>
			</div>
      
		</div>
	);
}
