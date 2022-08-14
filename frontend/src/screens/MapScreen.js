import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const defaultLocation = { lat: 31.9426855, lng: 34.82667 };
const libs = ['places'];

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true;
    const isBrowser = typeof document !== 'undefined'; // require('@react-google-maps/api/src/utils/isbrowser')
    const isAlreadyLoaded =
      window.google &&
      window.google.maps &&
      document.querySelector('body.first-hit-completed'); // AJAX page loading system is adding this class the first time the app is loaded
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error('google api is already presented');
        return;
      }

      this.isCleaningUp().then(this.injectScript);
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true });
    }
  }
}

export default function MapScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const navigate = useNavigate();
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation os not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios('/api/keys/google', {
        headers: { Authorization: `BEARER ${userInfo.token}` },
      });
      getUserCurrentLocation();
    };

    fetch();
    ctxDispatch({
      type: 'SET_FULLBOX_ON',
    });
  }, [ctxDispatch, userInfo]);

  const onLoad = (map) => {
    mapRef.current = map;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const onConfirm = () => {
    const places = placeRef.current.getPlaces() || [{}];
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION',
      payload: {
        lat: location.lat,
        lng: location.lng,
        address: places[0].formatted_address,
        name: places[0].name,
        vicinity: places[0].vicinity,
        googleAddressId: places[0].id,
      },
    });
    toast.success('location selected successfully.');
    navigate('/shipping');
  };
  return (
    <div className="full-box">
      <LoadScriptOnlyIfNeeded
        libraries={libs}
        googleMapsApiKey={'AIzaSyBS-UMDSXfDIB_H4oFtYv4HaSj0x--NS00'}
      >
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={20}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input
                type="text"
                defaultValue={
                  shippingAddress.address +
                  ', ' +
                  shippingAddress.city +
                  ', ' +
                  shippingAddress.country
                }
              ></input>
              <Button type="button" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScriptOnlyIfNeeded>
    </div>
  );
}
