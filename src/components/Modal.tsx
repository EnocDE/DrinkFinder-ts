import { Dialog, Transition } from "@headlessui/react";
import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { useAppStore } from "../stores/useAppStore";
import { Recipe } from "../types";

export default function Modal() {
	const {
		modal,
		closeModal,
		selectedRecipe,
		handleClickFavorite,
		favorites,
		favoriteExist,
	} = useAppStore();
	const exist = useMemo(
		() => favoriteExist(selectedRecipe.idDrink),
		[selectedRecipe, favorites]
	);

	function renderIngredients() {
		const ingredients: JSX.Element[] = [];
		for (let i = 1; i <= 15; i++) {
			const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
			const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

			if (ingredient && measure) {
				ingredients.push(
					<li key={i} className="text-lg font-normal list-disc">
						{ingredient} {measure ? `- ${measure}` : ""}
					</li>
				);
			}
		}
		return ingredients;
	}

	return (
		<>
			<Transition appear show={modal} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-70" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
									<Dialog.Title
										as="h3"
										className="text-gray-900 text-4xl font-extrabold my-5 text-center"
									>
										{selectedRecipe.strDrink}
									</Dialog.Title>
									<img
										className="rounded-2xl mx-auto w-96"
										src={selectedRecipe.strDrinkThumb}
										alt={`Imagen bebida ${selectedRecipe.strDrink}`}
									/>
									<Dialog.Title
										as="h3"
										className="text-gray-900 text-2xl font-extrabold my-5"
									>
										Ingredientes y Cantidades
									</Dialog.Title>
									<ul className="pl-6">{renderIngredients()}</ul>
									<Dialog.Title
										as="h3"
										className="text-gray-900 text-2xl font-extrabold my-5"
									>
										Instrucciones
									</Dialog.Title>
									<p className="text-lg">{selectedRecipe.strInstructions}</p>

									<button
										type="button"
										className="absolute mt-0 p-0 top-5 right-5 font-bold w-8 h-8 md:w-10 md:h-10 rounded bg-red-600 text-white shadow hover:bg-red-500 transition-colors"
										onClick={closeModal}
									>
										✕
									</button>
									<div className="mt-5 flex justify-between gap-4">
										<button
											type="button"
											className="w-full rounded bg-orange-500 p-3 font-bold text-white shadow hover:bg-orange-400 transition-colors"
											onClick={() => {
												handleClickFavorite(selectedRecipe);
												closeModal();
											}}
										>
											{!exist ? "Agregar a favoritos" : "Eliminar de favoritos"}
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
