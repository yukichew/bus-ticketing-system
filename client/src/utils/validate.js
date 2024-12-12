export const validateField = async (field, value, setErrors, schema, state) => {
  try {
    await schema.validateAt(field, { ...state, [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
  } catch (err) {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: err.message }));
  }
};
