declare module 'react-location-picker' {
    import React from 'react';
  
    interface LocationPickerProps {
      containerElement: React.ReactNode;
      mapElement: React.ReactNode;
      defaultPosition: { lat: number; lng: number };
      onChange: (newLocation: { lat: number; lng: number }) => void;
    }
  
    const LocationPicker: React.ComponentType<LocationPickerProps>;
    export default LocationPicker;
}
  