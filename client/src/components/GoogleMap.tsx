import React, { useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface MapContainerProps {
  coordinates: [number, number][];
}

const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const GoogleMapContainer: React.FC<MapContainerProps> = ({ 
    coordinates 
}) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  // const defaultCenter = {
  //   lat: coordinates.length > 0 ? coordinates[0][0] : 0,
  //   lng: coordinates.length > 0 ? coordinates[0][1] : 0,
  // };

  const defaultCenter = calculateCenter(coordinates);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleApiKey
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded) {
      // Calculate bounds based on coordinates
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coordinate) => {
        bounds.extend(new window.google.maps.LatLng(coordinate[0], coordinate[1]));
      });

      // Fit the map to the calculated bounds
      mapRef.current?.fitBounds(bounds);
    }
  }, [isLoaded, coordinates]);


  return isLoaded ? (
      <GoogleMap 
        mapContainerStyle={mapStyles} 
        zoom={12} 
        center={defaultCenter} 
      >
        {coordinates.map((coordinate, index) => (
          <Marker 
            visible={true}
            key={index}
            position={{
              lat: coordinate[0],
              lng: coordinate[1]
            }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#1976D2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><circle cx="12" cy="9" r="2.5" fill="#FFF"/></svg>'),
              scaledSize: new window.google.maps.Size(24, 24),
            }}
          />
        ))}
        
      </GoogleMap>
  ): 
  <>
    <div>No Map was loaded</div>
  </>;
};

function calculateCenter(coords: [number, number][]): { lat: number; lng: number } {
  if (coords.length === 0) {
    return { lat: 0, lng: 0 };
  }

  const latitudes = coords.map((coord) => coord[0]);
  const longitudes = coords.map((coord) => coord[1]);

  const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
  const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;

  return { lat: centerLat, lng: centerLng };
}

export default GoogleMapContainer;