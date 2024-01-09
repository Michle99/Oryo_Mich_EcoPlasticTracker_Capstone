import React, { useState } from "react";
import LocationPicker from "react-location-picker";


interface ReportFormProps {
    onSubmitSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmitSuccess }) => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [type, setType] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [imageInput, setImageInput] = useState<string>('');

    return (
        <form>

        </form>
    )
}

export default ReportForm;