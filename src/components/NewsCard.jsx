import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsCard = (props) => {
  const { id, thumbnail, title, description } = props;
  return (
    <Card className='h-100 d-flex flex-column align-items-center justify-content-between'>
      <Link to={`/news/${id}`} component='div'>
        <Card.Img src={thumbnail} variant='top' />
        <Card.Body>
          <Card.Title className='text-center'>{title}</Card.Title>
          <Card.Text className='text-center'>{description}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default NewsCard;
