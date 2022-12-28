import { useEffect, useReducer } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function AllProductsScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      const payload = []
      try {
        const categories = ["tops","womens-dresses","womens-shoes","mens-shirts","mens-shoes"]
        categories.forEach(async (cat)=> {
            const dummyresult = await axios.get('https://dummyjson.com/products/category/'+cat+'?limit=20');
            dummyresult.data.products.forEach(elm => {
                payload.push({
                    image: elm.images[0],
                    slug: elm.id,
                    name: elm.title,
                    rating: elm.rating,
                    numReviews: Math.floor(Math.random()* 10000),
                    price: elm.price,
                    countInStock: elm.stock
                })
                
            });
        })
        // const res = await axios.post('/api/products/save',payload)
        // console.log(res.data);

        const featured = await axios.get('api/products');

        featured.data.forEach((elm)=>{payload.push(elm)})
        
        dispatch({ type: 'FETCH_SUCCESS', payload: payload });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Sharm</title>
      </Helmet>
      <h1>All Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default AllProductsScreen;
