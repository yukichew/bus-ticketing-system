export const validateField = async (field, value, setErrors, schema) => {
  try {
    await schema.validateAt(field, { [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
  } catch (err) {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: err.message }));
  }
};
