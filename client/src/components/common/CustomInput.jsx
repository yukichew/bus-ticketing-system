import React from 'react';

const CustomInput = ({
  placeholder,
  required,
  id,
  name,
  type,
  icon: Icon = null,
  value,
  onChange,
  multiline = false,
}) => {
  return (
    <div className='relative flex items-center w-full'>
      {Icon && (
        <Icon
          size={20}
          className='absolute text-gray-400 pointer-events-none ml-3'
        />
      )}
      {multiline ? (
        <textarea
          placeholder={placeholder}
          required={required}
          className={`w-full h-24 p-2 ${
            Icon ? 'pl-12' : ''
          } rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          placeholder={placeholder}
          required={required}
          type={type}
          className={`w-full h-12 px-4 ${
            Icon ? 'pl-12' : ''
          } rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm`}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default CustomInput;
