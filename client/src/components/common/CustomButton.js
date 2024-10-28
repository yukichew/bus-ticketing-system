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
      className={`w-full relative flex items-center justify-center font-medium font-poppins tracking-wide text-white ${className}`}
    >
      {LeftIcon && (
        <LeftIcon size={20} className='absolute left-4 pointer-events-none' />
      )}
      <button
        type={type}
        onClick={onClick}
        className={`${
          disabled
            ? 'bg-gray-400'
            : 'bg-primary hover:bg-secondary w-full h-12 transition duration-200 rounded-lg shadow-md'
        }`}
        disabled={disabled}
      >
        {title}
      </button>
      {RightIcon && (
        <RightIcon size={15} className='absolute right-4 pointer-events-none' />
      )}
    </div>
  );
};

export default CustomButton;
