// src/components/ReportForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import GoogleMapPicker from 'react-google-map-picker';

interface ReportFormProps {
  onSubmitSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmitSuccess }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [type, setType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState<string>('');

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Retrieve the token from wherever it's stored in your application
      const token = 'your_user_token'; // Replace with your actual token retrieval logic

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
          title,
          description,
          images,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Pollution report submitted:', responseData);
        onSubmitSuccess(); // Optionally trigger a callback upon successful submission
      } else {
        console.error('Error submitting pollution report:', response.status);
        // Handle errors, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error submitting pollution report:', error);
      // Handle errors, e.g., display an error message to the user
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
        Title:
        <input type="text" value={title} onChange={handleTitleChange} required />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={description} onChange={handleDescriptionChange} required />
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
        <GoogleMapPicker
          defaultLocation={{ lat: location.lat, lng: location.lng }}
          onChangeLocation={handleLocationChange}
          apiKey=''
        />
      </label>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
