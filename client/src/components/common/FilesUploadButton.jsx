import React, { useState, useEffect } from 'react';
import { PiUploadSimple } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const FilesUploadButton = ({ setImages, initialFiles = [], maxFiles = 2, maxFileSize = 2 * 1024 * 1024, aspectRatio = "square" }) => {
    const [files, setFiles] = useState(initialFiles);

    useEffect(() => {
        setImages(files);
    }, [files, setImages]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(validateFile);
        const newFiles = [...files, ...validFiles].slice(0, maxFiles);
        setFiles(newFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(validateFile);
        const newFiles = [...files, ...validFiles].slice(0, maxFiles);
        setFiles(newFiles);
    };

    const validateFile = (file) => {
        const validFormats = ['image/svg+xml', 'image/jpeg', 'image/png'];
        if (!validFormats.includes(file.type)) {
            alert('Only SVG, JPG, and PNG files are supported.');
            return false;
        }
        if (file.size > maxFileSize) {
            alert(`File size should not exceed ${maxFileSize / (1024 * 1024)} MB.`);
            return false;
        }
        return true;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDelete = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 text-center cursor-pointer w-full" onDrop={handleDrop} onDragOver={handleDragOver}>
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center font-poppins text-gray-500 rounded-full w-12 h-12 bg-indigo-50 shadow-md">
                            <PiUploadSimple className="text-primary" size={24} />
                        </label>
                        <div className="font-poppins text-black text-xs mt-3">
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
                        <div className="font-poppins text-xs text-gray-500 mt-1">
                            Supported Format: SVG, JPG, PNG
                        </div>
                    </div>
                </div>

                <div className="font-poppins text-xs text-gray-600 mt-2 w-full text-left">
                    *Only {maxFiles} image{maxFiles > 1 ? "s" : ""} {maxFiles > 1 ? "are" : "is"} allowed to be uploaded.
                </div>

                {files.length > 0 && (
                    <div className="mt-2 w-full">
                        <div className="flex flex-col space-y-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between w-full">
                            <div className={`flex-shrink-0 ${aspectRatio === "square" ? "h-12 w-12" : "h-10 w-16"}`}>
                                <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className={`w-full h-full object-cover ${aspectRatio === "square" ? "aspect-square" : "aspect-[16/9]"}`}
                                />
                            </div>
                            <div className="flex-grow ml-3 flex items-center justify-between">
                                <span className="font-poppins text-sm break-words">{file.name}</span>
                                <button
                                onClick={() => handleDelete(index)}
                                className="rounded-full p-1 border border-gray-100 shadow-lg hover:bg-red-100 transition duration-200"
                                >
                                <AiOutlineDelete className="text-red-500" size={20} />
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
            </div>
        </>
    );
};

export default FilesUploadButton;