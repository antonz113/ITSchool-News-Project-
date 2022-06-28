import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { getNewsDetails } from "../api/adaptors";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";
import style from "./NewsDetails.module.css";
import { formatDate } from "../utils/formatDate";
import { useContext } from "react";
import { FavoritesContext } from "../store/Favorites/context";
import { addToFavorite } from "../store/Favorites/actions";

const NewsDetails = () => {
  const { favoritesDispatch } = useContext(FavoritesContext);

  const { newsId, "*": restOfURL } = useParams();

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
  };

  return (
    <Layout>
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
