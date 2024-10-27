const CustomButton = ({
  title,
  type,
  onClick,
  className,
  leftIcon: LeftIcon = null,
  rightIcon: RightIcon = null,
  disabled = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${
        disabled ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'
      } w-full h-12 px-6 font-medium font-poppins tracking-wide text-white transition duration-200 rounded-lg shadow-md ${className}`}
    >
      {LeftIcon && (
        <LeftIcon
          size={20}
          className='absolute left-4 text-gray-400 pointer-events-none'
        />
      )}
      <button
        type={type}
        onClick={onClick}
        className='mx-1'
        disabled={disabled}
      >
        {title}
      </button>
      {RightIcon && (
        <RightIcon
          size={20}
          className='absolute right-4 text-gray-400 pointer-events-none'
        />
      )}
    </div>
  );
};

export default CustomButton;
