import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
	const [searchFilters, setSearchFilters] = useState({
		ingredient: "",
		category: "",
	});
	const { pathname } = useLocation();
	const isHome = useMemo(() => pathname === "/", [pathname]);

	const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore();
	useEffect(() => {
		fetchCategories();
	}, []);

	function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (Object.values(searchFilters).includes("")) {
      showNotification({text: 'Todos los campos son obligatorios', error: true})
			return;
		}
		// Consultar la receta
		searchRecipes(searchFilters);
	}

	return (
		<header className={isHome ? "relative" : "bg-slate-800"}>
			{isHome && (
				<div className="bg-header bg-center bg-cover absolute top-0 w-full h-full -z-10 filter brightness-50"></div>
			)}
			<div className="mx-auto container px-5 py-16">
				<div className="flex justify-between items-center">
					<div>
						<img className="w-32" src="/logo.svg" alt="logotipo" />
					</div>

					<nav className="text-white text-xl flex gap-4">
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-orange-400 font-bold hover:translate-y-[-5px] transition-transform"
									: "font-bold hover:translate-y-[-5px] transition-transform"
							}
							to="/"
						>
							Inicio
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-orange-400 font-bold hover:translate-y-[-5px] transition-transform"
									: "font-bold hover:translate-y-[-5px] transition-transform"
							}
							to="/favoritos"
						>
							Favoritos
						</NavLink>
					</nav>
				</div>

				{isHome && (
					<form
						className="md:w-1/2 xl:h-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
						onSubmit={handleSubmit}
					>
						<div className="space-y-4">
							<label
								htmlFor="ingredient"
								className="block text-white font-extrabold text-lg"
							>
								Nombre o ingredientes:
							</label>
							<input
								type="text"
								id="ingredient"
								name="ingredient"
								className="p-3 rounded-lg w-full focus:outline-none"
								placeholder="Nombre o ingrediente. Ej: Vodka, Tequila, Café"
								value={searchFilters.ingredient}
								onChange={handleChange}
							/>
						</div>

						<div className="space-y-4">
							<label
								htmlFor="category"
								className="block text-white font-extrabold text-lg"
							>
								Categoría:
							</label>
							<select
								id="category"
								name="category"
								className="p-3 rounded-lg w-full focus:outline-none"
								value={searchFilters.category}
								onChange={handleChange}
							>
								<option value="">-- Seleccione --</option>
								{categories.drinks.map((category) => (
									<option
										key={category.strCategory}
										value={category.strCategory}
									>
										{category.strCategory}
									</option>
								))}
							</select>
						</div>

						<input
							type="submit"
							value="Buscar recetas"
							className="cursor-pointer bg-gray-600 hover:bg-gray-500 transition-colors text-white font-extrabold w-full p-2 rounded-lg"
						/>
					</form>
				)}
			</div>
		</header>
	);
}
