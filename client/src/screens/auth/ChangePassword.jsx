import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff, IoKeyOutline } from "react-icons/io5";
import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";
import * as yup from "yup";
import { validateField } from "../../utils/validate";
import { changePassword } from "../../api/auth";
import { toast } from "react-toastify";
import Container from "../../components/Container";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const passwordValidation = yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character (e.g., !, @, #)"
    )
    .required("Password is required");

  const resetPasswordSchema = yup.object().shape({
    password: passwordValidation,
    oldPassword: passwordValidation,
  });

  const handleChange = (field, value) => {
    if (field === "newPassword") setNewPassword(value);
    if (field === "oldPassword") setOldPassword(value);
    validateField(field, value, setErrors, resetPasswordSchema);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordSchema.validate(
        { oldPassword, password: newPassword },
        { abortEarly: false }
      );
      const response = await changePassword(oldPassword, newPassword);
      if (response?.error) {
        return toast.error(response.message);
      }
      toast.success("Password changed successfully");
      navigate("/profile");
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <Container>
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8">
            <h3 className="font-poppins mb-4 text-xl font-semibold sm:text-center sm:mb-2 sm:text-2xl">
              Change Your Password
            </h3>
            <form className="mt-8">
              <div className="relative mt-3">
                <CustomInput
                  id={"oldPassword"}
                  name={"oldPassword"}
                  placeholder={"Old Password"}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  required
                  icon={IoKeyOutline}
                  onChange={(e) => handleChange("oldPassword", e.target.value)}
                  error={errors.oldPassword}
                />
                <div
                  className="absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {isConfirmPasswordVisible ? (
                    <IoEye size={20} className="text-gray-400" />
                  ) : (
                    <IoEyeOff size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              <div className="relative mt-3">
                <CustomInput
                  id={"newpassword"}
                  name={"newpassword"}
                  placeholder={"New Password"}
                  type={isPasswordVisible ? "text" : "newpassword"}
                  required
                  icon={IoKeyOutline}
                  onChange={(e) => handleChange("password", e.target.value)}
                  error={errors.newPassword}
                />
                <div
                  className="absolute inset-y-0 right-2 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <IoEye size={20} className="text-gray-400" />
                  ) : (
                    <IoEyeOff size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              <div className="mt-10">
                <CustomButton title={"Confirm"} onClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChangePassword;
