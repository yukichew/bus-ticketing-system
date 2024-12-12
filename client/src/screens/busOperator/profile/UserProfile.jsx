import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineSubtitles, MdOutlineTitle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Container from '../../../components/Container';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import FilesUploadButton from '../../../components/common/FilesUploadButton';
import { useAuth } from '../../../utils/AuthContext';
import { getUserProfile } from '../../../api/auth';

const UserProfile = () => {
  const token = sessionStorage.getItem('token');
  const { auth } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    contactNo: '',
    address: '',
    companyLogo: '',
    bio: '',
    isRefundable: '',
  });

  const fetchProfile = async () => {
    if (auth) {
      const profile = await getUserProfile(token);

      setFormData({
        companyName: profile.userName ?? '-',
        companyEmail: profile.email ?? '-',
        contactNo: profile.phoneNumber ?? '-',
        address: profile.address ?? '-',
        companyLogo: profile.companyLogo ?? '',
        bio: profile.bio ?? '-',
        isRefundable: profile.isRefundable ?? '-',
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [auth]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [field]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSubmit = (form) => {
    alert(`${form} information saved!`);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  return (
    <>
      <Container>
        
        <div className='w-4/5 mt-5 mb-10 mx-auto'>
          <div className='flex items-center justify-between'>
              <h2 className='font-poppins font-bold text-2xl'>User Profile</h2>

              <div className='w-28'>
                  <CustomButton title="Edit Profile" onClick={handleEdit} disabled={isEditable}/>
              </div>
          </div>

          <div className='flex justify-center space-x-4 mx-auto'>
            <Card header='Company Information'>
              <div className='flex flex-col space-y-4'>
                <div>
                  <label
                    htmlFor='companyname'
                    className='block text-sm font-poppins font-medium text-gray-700'
                  >
                    Company Name
                  </label>
                  <input
                    type='text'
                    id='companyname'
                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                    placeholder='Enter company name'
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label
                    htmlFor='companyemail'
                    className='block text-sm font-poppins font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    type='text'
                    id='companyemail'
                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                    placeholder='Enter company email'
                    value={formData.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label
                    htmlFor='companycontact'
                    className='block text-sm font-poppins font-medium text-gray-700'
                  >
                    Contact No.
                  </label>
                  <input
                    type='text'
                    id='companycontact'
                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                    placeholder='Enter company contact number'
                    value={formData.contactNo}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-poppins font-medium text-gray-700'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                    placeholder='Enter address'
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div> 
            <Card header="Company Logo" className="flex-grow">
              {formData.companyLogo === '' ? (
                <p className='text-gray-500 font-small font-poppins'>No company logo uploaded.</p>
              ) : (
                <img
                  src={formData.companyLogo}
                  alt="Company Logo"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              )}

              {isEditable && (
                <FilesUploadButton
                  setImages={setImages}
                  initialFiles={images.map((name) => new File([], name))}
                  maxFiles={1}
                  maxFileSize={1 * 1024 * 1024}
                  aspectRatio="square"
                />
              )}
            </Card>
          </div>

          <div>
            <Card header='Bus Photos' className='flex-grow'>
              <div className='flex justify-between space-x-4 h-full'>
                <div className='w-1/2 h-full bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden'>
                  <img
                    className='object-cover h-full w-full'
                    src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Bus Image 1'
                  />
                </div>

                <div className='w-1/2 h-full bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden'>
                  <img
                    className='object-cover h-full w-full'
                    src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Bus Image 2'
                  />
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card header='Bio'>
                <>
                  <CustomInput
                    id={'bio'}
                    name={'bio'}
                    placeholder={'Bio'}
                    type={'text'}
                    required
                    icon={MdOutlineSubtitles}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditable}
                  />
                </>
            </Card>
          </div>

          {isEditable && ( 
            <div className='mt-8 mb-10 flex justify-between'>
              <div className='w-28'>
                  <CustomButton title="Cancel" onClick={handleCancel} />
              </div>
              <div className='w-28'>
                  <CustomButton title="Save" onClick={handleSubmit} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
