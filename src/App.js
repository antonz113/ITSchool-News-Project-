import Page404 from "./pages/Page404";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NewsCategory from "./pages/NewsCategory";
import NewsDetails from "./pages/NewsDetails";
import { useReducer } from "react";
import { initialState, favoritesReducer } from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";

function App() {
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialState
  );

  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    <div className='App'>
      <FavoritesContext.Provider value={favoritesContextValue}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='category/:categoryId' element={<NewsCategory />} />
          <Route path='news/:newsId*' element={<NewsDetails />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </FavoritesContext.Provider>
    </div>
  );
}

export default App;
