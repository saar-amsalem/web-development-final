
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/esm/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getError } from '../utils';

function Sidebar(props) {

    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weatherText,setWeatherText] = useState(null)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f4d39e1dce87645a615f46573e45bf34`;
  const searchLocation = async(event) => {
    if (event.key === 'Enter' || event.key === 'click') {
      await axios.get(url).then((response) => {
        setData(response.data);
        setWeatherText('The Tempeture in the ' + location + ' you have entered is: ' + ((response.data.main.temp.toFixed() - 32) / 1.8).toFixed() + ' °C')
      });
      
    }
  };

    return (
        <Nav className="flex-column text-white w-100 p-2">
            
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => props.setfunc(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
            <Nav.Item>
              <LinkContainer to={'/products'}>
                <Nav.Link>
                  All Products
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <video height="120" controls loop>
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Nav.Item>
            <Nav.Item style={{"margin-top":"50px"}}>
              <h6>Wanna Know the Weather ?</h6>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                onMouseEnter={searchLocation}
                placeholder="Enter Your Location"
                type="text"
              />
            </Nav.Item>
            {data.main ? (
            <h3>
              {weatherText}
            </h3>
          ) : (
            'city not found'
          )}
          </Nav>
    )
}

export default Sidebar