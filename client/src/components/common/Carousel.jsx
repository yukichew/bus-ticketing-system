import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className='relative w-full max-w-lg mx-auto'>
      <div className='relative overflow-hidden rounded-lg max-h-96'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              src={image}
              alt={`image-${index}`}
              className='w-full flex-shrink-0'
            />
          ))}
        </div>
      </div>

      {/* navigation butons */}
      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-85 text-white p-2 rounded-full'
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-85 text-white p-2 rounded-full'
      >
        <FaChevronRight />
      </button>

      {/* indicators */}
      <div className='flex justify-center mt-2 space-x-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
