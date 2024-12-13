import React, { useState, useEffect } from 'react';
import { MdOutlineSubtitles } from 'react-icons/md';
import Container from '../../../components/Container';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomInput from '../../../components/common/CustomInput';
import FilesUploadButton from '../../../components/common/FilesUploadButton';
import { useAuth } from '../../../utils/AuthContext';
import { getUserProfile } from '../../../api/auth';
import { uploadToS3, deleteImageFromS3 } from '../../../utils/s3Context';
import { editBOProfile } from '../../../api/busOperator';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const token = sessionStorage.getItem('token');
  const { auth } = useAuth();
  const [busOperatorID, setBusOperatorID] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [busImages, setBusImages] = useState([]);
  const [logo, setLogo] = useState("");
  const [previousLogo, setPreviousLogo] = useState("");
  const [newLogo, setNewLogo] = useState("");
  const [formData, setFormData] = useState({
    fullname: '',
    companyEmail: '',
    phoneNumber: '',
    address: '',
    bio: '',
  });

  const fetchProfile = async () => {
    if (auth) {
      const profile = await getUserProfile(token);
      
      setFormData({
        fullname: profile.fullname ?? '-',
        companyEmail: profile.email ?? '-',
        phoneNumber: profile.phoneNumber ?? '-',
        address: profile.address ?? '-',
        bio: profile.bio ?? '-',
      });

      setBusOperatorID(profile.id);
      setLogo(profile.companyLogo);
      setPreviousLogo(profile.companyLogo);
      setBusImages(profile.busImages || []);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [auth, busOperatorID]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [field]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = [];
    let previousLogoKey = ""; 

    try {
        if (previousLogo) {
            const keyFromUrl = previousLogo.split('/').pop();
            previousLogoKey = keyFromUrl;
        }

        if (newLogo.length > 0) {
            for (const image of newLogo) {
                if (image instanceof File) {
                    const uploadResult = await uploadToS3(image);
                    if (uploadResult) {
                        uploadedImages.push(uploadResult);
                    } else {
                        throw new Error(`Failed to upload image: ${image.name}`);
                    }
                }
            }
        }

        if (uploadedImages.length === 0 && !logo) {
            throw new Error("No images uploaded.");
        }

        const busOperatorDetails = {
            ...formData,
            busImages: busImages,
            companyLogo: uploadedImages.length > 0 ? uploadedImages[0].url : logo,
        };

        const response = await editBOProfile(busOperatorID, busOperatorDetails);

        if (response?.error) {
            throw new Error(response.message);
        }

        if (uploadedImages.length > 0 && previousLogoKey) {
            const isDeleted = await deleteImageFromS3(previousLogoKey);
            if (!isDeleted) {
                console.error(`Failed to delete previous logo with key: ${previousLogoKey}`);
            }
        }

        toast.success("Profile updated successfully.");
        fetchProfile();
        setIsEditable(false);
    } catch (error) {
        for (const img of uploadedImages) {
            const isDeleted = await deleteImageFromS3(img.key);
            if (!isDeleted) {
                console.error(`Failed to delete image with key: ${img.key}`);
            }
        }

        toast.error(error.message);
    }
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
                    htmlFor='fullname'
                    className='block text-sm font-poppins font-medium text-gray-700'
                  >
                    Company Name
                  </label>
                  <input
                    type='text'
                    id='fullname'
                    className={`w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm mt-1 ${
                      isEditable ? 'text-black' : 'text-gray-500'
                    }`}
                    placeholder='Enter company name'
                    value={formData.fullname}
                    onChange={(e) => handleInputChange('fullname', e.target.value)}
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
                    className={`w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm mt-1 ${
                      isEditable ? 'text-black' : 'text-gray-500'
                    }`}
                    placeholder='Enter company email'
                    value={formData.companyEmail}
                    disabled
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
                    className={`w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm mt-1 ${
                      isEditable ? 'text-black' : 'text-gray-500'
                    }`}
                    placeholder='Enter company contact number'
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
                    className={`w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm mt-1 ${
                      isEditable ? 'text-black' : 'text-gray-500'
                    }`}
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
              {!logo ? (
                <p className='text-gray-500 font-small font-poppins'>No company logo uploaded.</p>
              ) : (
                <div className="flex flex-col items-start">
                  <img
                    src={logo}
                    alt="Company Logo"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                  {isEditable && (
                    <button
                      className="w-[200px] max-w-[200px] mt-2 border border-red-500 rounded-lg text-red-700 py-2 hover:bg-red-500 hover:text-white hover:font-medium"
                      onClick={() => setLogo('')}
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}

              {isEditable && !logo && (
                <FilesUploadButton
                  setImages={setNewLogo}
                  initialFiles={newLogo}
                  maxFiles={1}
                  maxFileSize={1 * 1024 * 1024}
                  aspectRatio="square"
                />
              )}
            </Card>
          </div>

          <div>
            <Card header='Bus Images' className='flex-grow'>
              <div className='flex justify-between space-x-4 h-full'>
                {busImages.map((image, index) => (
                  <div key={index} className='w-1/2 h-full'>
                    <div className='border border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden'>
                      <img
                        className='object-cover'
                        src={image}
                        alt={`Bus Image ${index + 1}`}
                        style={{ width: '100%', height: '300px' }}
                      />
                    </div>
                  </div>
                ))}
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
