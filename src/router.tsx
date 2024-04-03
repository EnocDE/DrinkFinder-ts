import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import IndexPage from "./pages/IndexPage";

// Mejora de rendimiento, separa en archivos js distintos para no cargar páginas de más mientras el usuario no las este visitando
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"))

// El Suspense muestra lo que se le pase en el fallback mientras esta cargando el elemento a mostrar

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<IndexPage />} index />
					<Route path="/favoritos" element={
            <Suspense fallback="Cargando..." >
                <FavoritesPage />
            </Suspense>
          } />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
