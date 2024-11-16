import React, { useState, useEffect } from 'react';
import { PiUploadSimple } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const FilesUploadButton = ({ setImages, initialFiles = [], maxFiles = 2, maxFileSize = 2 * 1024 * 1024, aspectRatio = "square" }) => {
    const [files, setFiles] = useState(initialFiles);

    useEffect(() => {
        setImages(files.map(file => file.name));
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-6 text-center cursor-pointer w-full" onDrop={handleDrop} onDragOver={handleDragOver}>
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center font-poppins text-gray-500 rounded-full w-16 h-16 bg-indigo-50 shadow-lg mt-2">
                            <PiUploadSimple className="text-primary" size={32} />
                        </label>
                        <div className="font-poppins text-black mt-8">
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
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mt-2 w-full">
                        <div className="flex flex-col space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between w-full">
                                    <div className={`flex-shrink-0 ${aspectRatio === "square" ? "h-20 w-20" : "h-16 w-24"}`}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className={`w-full h-full object-cover ${aspectRatio === "square" ? "aspect-square" : "aspect-[16/9]"}`}
                                        />
                                    </div>
                                    <div className="flex-grow ml-3 flex items-center justify-between"> {/* Allow file name to grow and be on the right */}
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