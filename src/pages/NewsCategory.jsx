import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { getNewsList } from "../api/adaptors";
import { getNewsCategoriesEndpoint } from "../api/endpoints";
import Layout from "../components/Layout";
import NewsCardsList from "../components/NewsCardsList";
import Pagination from "../components/Pagination";
import { useFetch } from "../utils/hooks/useFetch";

const NewsCategory = () => {
  const { categoryId } = useParams();

  const queryParams = new URLSearchParams(useLocation().search);

  let currentPage = queryParams.get("page");

  if (!currentPage) {
    currentPage = 1;
  }

  const newsCategoryEndpoint = getNewsCategoriesEndpoint(
    categoryId,
    currentPage
  );

  const data = useFetch(newsCategoryEndpoint);

  const adaptedNewsList = getNewsList(data);

  let title;

  switch (categoryId) {
    case "technology": {
      title = "Tech";
      break;
    }
    case "football": {
      title = "Fotbal";
      break;
    }
    default:
      title = "";
      break;
  }

  return (
    <div>
      <Layout>
        <Container className='my-5'>
          <h1 className='mb-5 pt-3 text-center'>{title}</h1>
          <NewsCardsList news={adaptedNewsList} />
          <Pagination
            currentPage={currentPage}
            baseUrl={`/category/${categoryId}`}
          />
        </Container>
      </Layout>
    </div>
  );
};

export default NewsCategory;
