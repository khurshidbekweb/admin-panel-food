import { Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";

// pages
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import Profil from "./pages/Profil";
import CategoriesPage from "./pages/CategoriesPage";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

// layouts
import RootLayouts from "./layouts/RootLayouts";

// blur css
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";
import { store } from "./redux/store";

function App() {
  const navigate = useNavigate();

  if (!localStorage.getItem("language")) localStorage.setItem("language", "uz");

  const restaurantId = localStorage.getItem("id");

  useEffect(() => {
    if (!restaurantId) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path=":restaurantId" element={<RootLayouts />}>
            <Route index element={<Home />} />
            <Route path=":categoryId" element={<CategoriesPage />} />
            <Route path="profile" element={<Profil />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
