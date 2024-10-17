import React, {useState} from 'react';
import { PiUploadSimple } from "react-icons/pi";

const FilesUploadButton = ({ className }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(validateFile);
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(validateFile);
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

    const validateFile = (file) => {
        const validFormats = ['image/svg+xml', 'image/jpeg', 'image/png'];
        if (file && validFormats.includes(file.type)) {
            return true;
        } else {
            alert('Only SVG, JPG, and PNG files are supported.');
            return false;
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className={'border-2 border-dashed border-gray-300 rounded-lg px-6 py-6 text-center cursor-pointer w-full'} onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="flex flex-col items-center justify-center">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center font-poppins text-gray-500 rounded-full w-16 h-16 bg-indigo-50 shadow-lg">
                    <PiUploadSimple className="text-primary" size={32}/>
                </label>
                <div className="font-poppins text-black mt-10">
                    <label htmlFor="file-upload" className="underline font-semibold text-primary cursor-pointer mr-1">
                        Click here
                    </label> 
                    to upload your file or drag and drop
                </div>
                <input
                    id="file-upload"
                    type="file"
                    accept=".svg,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                />
                <div className="font-poppins text-sm text-gray-500 mt-3">
                    Supported Format: SVG, JPG, PNG
                </div>
                {files.length > 0 && (
                    <div className="mt-3 text-sm text-gray-700">
                        <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilesUploadButton;
