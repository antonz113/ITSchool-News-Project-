import { useContext } from "react";
import { Container } from "react-bootstrap";
import Layout from "../components/Layout";
import NewsCardsList from "../components/NewsCardsList";
import { FavoritesContext } from "../store/Favorites/context";

const Favorites = () => {
  const { favoritesState } = useContext(FavoritesContext);
  const { news } = favoritesState;

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
