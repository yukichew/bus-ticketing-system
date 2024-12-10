import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import { CiEdit } from 'react-icons/ci';
import CustomButton from '../../components/common/CustomButton';
import Container from '../../components/Container';
import CustomInput from '../../components/common/CustomInput';
import * as yup from 'yup';
import { validateField } from '../../utils/validate';
import { editProfile, getUserProfile } from '../../api/auth';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const profileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(
        /^\+60\d{10,11}$/,
        'Phone number must be in the format +60123456789'
      ),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      setDetails({
        name: profile.userName,
        phoneNumber: profile.phoneNumber,
        email: profile.email,
      });
    };
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setDetails((prev) => {
      const updated = { ...prev, [field]: value };
      validateField(field, value, setErrors, profileSchema);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await editProfile(details.name, details.phoneNumber);

    if (response?.error) {
      return toast.error(response.message);
    }

    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <Container>
      <div className='w-4/5 mx-auto mt-7'>
        <h3 className='font-poppins font-bold text-2xl'>User Profile</h3>
        <Card
          header='Personal Information'
          Icon={CiEdit}
          onClick={
            isEditing ? () => setIsEditing(false) : () => setIsEditing(true)
          }
          tooltip='Edit'
        >
          <div className='space-y-3'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2 pl-1'
              >
                Email
              </label>
              <CustomInput
                id={'email'}
                name={'email'}
                placeholder={'Email'}
                type={'email'}
                value={details.email}
                disabled={true}
              />
            </div>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-2 pl-1'
              >
                Name
              </label>
              <CustomInput
                id={'name'}
                name={'name'}
                placeholder={'Name'}
                type={'text'}
                required
                value={details.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label
                htmlFor='Contact Number'
                className='block text-sm font-medium text-gray-700 mb-2 pl-1'
              >
                Contact Number
              </label>
              <CustomInput
                id={'phoneNumber'}
                name={'phoneNumber'}
                placeholder={'Contact Number'}
                type={'text'}
                required
                value={details.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                error={errors.phoneNumber}
                disabled={!isEditing}
              />
            </div>
          </div>
          {isEditing && (
            <CustomButton
              title={'Save'}
              onClick={handleSubmit}
            />
          )}
        </Card>
      </div>
    </Container>
  );
};

export default Profile;
