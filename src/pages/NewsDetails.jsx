import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getNewsDetails } from "../api/adaptors";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import { useFetch } from "../utils/hooks/useFetch";

const NewsDetails = () => {
  const { newsId } = useParams();

  const newsItemEndpoint = getNewsDetailsEndpoint();

  const newsDetails = useFetch(newsItemEndpoint);

  const adaptedNewsDetails = getNewsDetails(newsDetails);

  const { title, description, image, author, date, content } =
    adaptedNewsDetails;

  return (
    <Layout>
      <Container className='my-5'>
        <Row>
          <Col xs={12} lg={8}>
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NewsDetails;
