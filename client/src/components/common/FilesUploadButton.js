import React, {useState, useEffect} from 'react';
import { PiUploadSimple } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const FilesUploadButton = ({ setImages, initialFiles = [] }) => {
    const [files, setFiles] = useState(initialFiles);

    useEffect(() => {
        setImages(files.map(file => file.name));
    }, [files, setImages]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(validateFile);
        const newFiles = [...files, ...validFiles].slice(0, 2);
        setFiles(newFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(validateFile);
        const newFiles = [...files, ...validFiles].slice(0, 2);
        setFiles(newFiles);
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
                        <div className={`grid gap-2 justify-items-center grid-cols-2`}>
                            {files.map((file, index) => (
                                <div key={index} className="relative w-full">
                                    <div className="w-full h-20 bg-gray-100 overflow-hidden">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center mt-2 mr-2 font-poppins text-sm break-words">
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="rounded-full p-1 border border-gray-100 shadow-lg hover:bg-red-100 transition duration-200 mr-2"
                                        >
                                            <AiOutlineDelete className="text-red-500" size={20} />
                                        </button>
                                        <span>{file.name}</span>
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