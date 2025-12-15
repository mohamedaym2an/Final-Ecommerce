const Input = ({
  register,
  label,
  placeholder,
  type,
  name,
  id,
  required,
  error,
}) => {
  return (
    <fieldset className="flex flex-col gap-3 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name, { required: required ? true : false })}
        className={`py-3 px-5 rounded-lg border focus:border-mainColor outline-none ${
          error ? "border-red-600" : "border-gray-200"
        }`}
      />
      {error && (
        <p className="text-xs font-medium text-red-600 ml-1 -translate-y-2 mb-0">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default Input;
