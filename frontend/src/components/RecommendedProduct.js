import axios from 'axios';
import React, { useState, useReducer, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';

const RecommendedProduct = (Productt) => {
  const [recommendedProduct, setRecommendedProduct] = useState(false);
  const category = Productt.children.category;
  const fetchData = async () => {
    try {
      const result = await axios.get('/api/products');
      console.log(result.data);
      return result.data;
    } catch (error) {}
  };

  const products = fetchData();

  useEffect(() => {
    if (products) {
      console.log('line 39: ' + products);

      products.then((result) => {
        console.log('line 30: ' + result);
        result.some((product) => {
          if (product._id !== Productt.children._id) {
            console.log('line 33: ' + product);
            if (product.category === category) {
              setRecommendedProduct(product);
              console.log(product.name);
              return true;
            }
            return false;
          }
        });
      });
    }
  }, []);

  return (
    <div>
      {console.log(recommendedProduct)}
      <h6>Recommended:</h6>
      {recommendedProduct ? (
        <Card>
          <Link to={`/product/${recommendedProduct.slug}`}>
            <img
              src={recommendedProduct.image}
              className="card-img-top"
              alt={recommendedProduct.name}
            />
          </Link>
          <Card.Body>
            <Link to={`/product/${recommendedProduct.slug}`}>
              <Card.Title>{recommendedProduct.name}</Card.Title>
            </Link>
            <Rating
              rating={recommendedProduct.rating}
              numReviews={recommendedProduct.numReviews}
            />
            <Card.Text>₪{recommendedProduct.price}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div>Cant Recommend</div>
      )}
    </div>
  );
};

export default RecommendedProduct;
