import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";
import NewsCardsList from "../components/NewsCardsList";
import { FavoritesContext } from "../store/Favorites/context";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

const Favorites = () => {
  const { favoritesState } = useContext(FavoritesContext);
  const { news } = favoritesState;

  // Extragem functia de modificare a localStorage-ului. Nu avem nevoie de state-ul din localStorage, conventia este ca pentru variabile neutilizate sa punem denumirea _.
  // Comentariul eslint-disable-next-line dezactiveaza eslint pentru urmatoarea linie (sa nu se planga ca nu utilizam variabila _).
  //eslint-disable-next-line
  const [_, setLocalStorageState] = useLocalStorage(
    "favorites",
    favoritesState
  );
  // Adaugarea in localStorage este un efect, atunci cand se modifica produsele favorite.
  // Cum strim ca s-au modificat produsele favorite? Primim o noua valoare a lui favoritesState.
  // setLocalStorageState este sugerat sa fie adaugat la dependente de o regula de lining.
  useEffect(() => {
    setLocalStorageState(favoritesState);
  }, [favoritesState, setLocalStorageState]);

  return (
    <Layout>
      <Container className='my-5'>
        <h1 className='mb-5 pt-3 text-center'>Stirile tale favorite</h1>
        {news.length === 0 ? (
          <p>Momentant nu ai nici o stire favorita</p>
        ) : (
          <NewsCardsList news={news} />
        )}
      </Container>
    </Layout>
  );
};

export default Favorites;
