import React, { useState, ChangeEvent, FormEvent } from 'react';
import LocationPicker from 'react-location-picker';

interface ReportFormProps {
  onSubmitSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmitSuccess }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [type, setType] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState<string>('');

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageInput(event.target.value);
  };

  const addImage = () => {
    if (imageInput.trim() !== '') {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleLocationChange = (newLocation: { lat: number; lng: number }) => {
    setLocation(newLocation);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Retrieve the token from wherever it's stored in your application
      const token = import.meta.env.VITE_JWT_SECRET_TOKEN;

      // Make a POST request to submit the pollution report using fetch
      const response = await fetch('http://localhost:3000/api/reports/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location,
          type,
          images,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Pollution report submitted:', responseData);
        onSubmitSuccess(); 
      } else {
        console.error('Error submitting pollution report:', response.status);
      }
    } catch (error) {
      console.error('Error submitting pollution report:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input type="text" value={type} onChange={handleTypeChange} required />
      </label>
      <br />
      <label>
        Images (optional):
        <input type="text" value={imageInput} onChange={handleImageInputChange} />
        <button type="button" onClick={addImage}>
          Add Image
        </button>
      </label>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            {image}
            <button type="button" onClick={() => removeImage(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <label>
        Location:
        {/* <LocationPicker
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          defaultPosition={{ lat: location.lat, lng: location.lng }}
          onChange={handleLocationChange}
        /> */}
      </label>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
