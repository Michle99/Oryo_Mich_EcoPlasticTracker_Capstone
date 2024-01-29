import React from 'react';
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

  const defaultCenter = {
    lat: coordinates.length > 0 ? coordinates[0][0] : 0,
    lng: coordinates.length > 0 ? coordinates[0][1] : 0,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleApiKey
  });

  return isLoaded ? (
      <GoogleMap 
        mapContainerStyle={mapStyles} 
        zoom={10} center={defaultCenter}
      >
        {coordinates.map((coordinate, index) => (
          <Marker 
            key={index}
            position={{
              lat: coordinate[0],
              lng: coordinate[1]
            }}
          />
        ))}
        
      </GoogleMap>
  ): 
  <>
    <div>No Map was loaded</div>
  </>;
};

export default GoogleMapContainer;