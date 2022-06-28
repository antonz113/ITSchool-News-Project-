import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { getNewsDetails } from "../api/adaptors";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import style from "./NewsDetails.module.css";
import { formatDate } from "../utils/formatDate";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../store/Favorites/context";
import { addToFavorite } from "../store/Favorites/actions";
// Importam hook-ul useLocalStorageState.
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

const NewsDetails = () => {
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  const { newsId, "*": restOfURL } = useParams();

  // Adaugam un state pentru afisarea alertei.
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false);
  // Extragem functia de modificare a localStorage-ului. Nu avem nevoie de state-ul din localStorage, conventia este ca pentru variabile neutilizate sa punem denumirea _.
  // Comentariul eslint-disable-next-line dezactiveaza eslint pentru urmatoarea linie (sa nu se planga ca nu utilizam variabila _).
  // eslint-disable-next-line
  const [_, setLocalStorageState] = useLocalStorage(
    "favorites",
    favoritesState
  );

  const completeNewsId = `${newsId}/${restOfURL}`;

  const newsItemEndpoint = getNewsDetailsEndpoint(completeNewsId);

  const newsDetails = useFetch(newsItemEndpoint);

  const adaptedNewsDetails = getNewsDetails(newsDetails);

  const { title, description, image, author, date, content, thumbnail } =
    adaptedNewsDetails;

  const formattedDate = formatDate(date);

  const handleFavoritesClick = () => {
    const newsObj = {
      id: completeNewsId,
      thumbnail,
      title,
      description,
      hasCloseButton: true,
    };

    const actionResult = addToFavorite(newsObj);
    favoritesDispatch(actionResult);

    // Afisam alerta.
    setIsAlertDisplayed(true);
    // Imediat ce afisam alerta, declansam un timer, care in 2 secunde va ascunde alerta.
    setTimeout(() => {
      setIsAlertDisplayed(false);
    }, 2000);
  };

  // Adaugarea in localStorage este un efect, atunci cand se modifica produsele favorite.
  // Cum strim ca s-au modificat produsele favorite? Primim o noua valoare a lui favoritesState.
  // setLocalStorageState este sugerat sa fie adaugat la dependente de o regula de lining.
  useEffect(() => {
    setLocalStorageState(favoritesState);
  }, [favoritesState, setLocalStorageState]);

  return (
    <Layout>
      {/* Afisam conditionat alerta */}
      {isAlertDisplayed && (
        <Alert variant='success' id={style.alert}>
          Succes! Poți vedea știrea accesând secțiunea Favorite.
        </Alert>
      )}
      <Container className={`${style.newsDetails} my-5`}>
        <Row className='d-flex justify-content-center'>
          <Col xs={12} lg={8}>
            <h1 className='mb-5 pt-5'>{title}</h1>
            <p className='fw-bold'>{description}</p>
            <div className='mb-4' dangerouslySetInnerHTML={{ __html: image }} />
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <div className='fw-bold'>
                <p>{author}</p>
                <p className='mb-0'>{formattedDate}</p>
              </div>
              <Button onClick={handleFavoritesClick}>Adauga la favorite</Button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NewsDetails;
