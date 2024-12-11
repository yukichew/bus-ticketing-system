import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineSubtitles, MdOutlineTitle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Container from '../../../components/Container';
import Card from '../../../components/common/Card';
import CustomButton from '../../../components/common/CustomButton';
import CustomField from '../../../components/common/CustomInput';
import FilesUploadButton from '../../../components/common/FilesUploadButton';

const UserProfile = () => {
  const [showBioFields, setShowBioFields] = useState(false);
  const [isBioDisabled, setIsBioDisabled] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [images, setImages] = useState([]);

  const handleEdit = (form) => {
    if (form === 'company') {
      setIsEditingCompany(!isEditingCompany);
    } else if (form === 'personal') {
      setIsEditingPersonal(!isEditingPersonal);
    } else if (form === 'bio') {
      setIsEditingBio(!isEditingBio);
    } else if (form === 'service') {
      setIsEditingService(!isEditingService);
    }
  };

  const handleCancel = (form) => {
    if (form === 'company') {
      setIsEditingCompany(false);
    } else if (form === 'personal') {
      setIsEditingPersonal(false);
    } else if (form === 'bio') {
      setIsEditingBio(false);
    } else if (form === 'service') {
      setIsEditingService(false);
    }
  };

  const handleSave = (form) => {
    alert(`${form} information saved!`);
  };

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    setCompanyInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    setPersonalInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleAddBio = () => {
    setShowBioFields(true);
    setIsBioDisabled(true);
  };

  const [companyInfo, setCompanyInfo] = useState({
    companyname: 'Super Nice Express',
    companyemail: 'contact@superniceexpress.com',
    companycontact: '089-345-6789',
    address: '123, Bukit Jalil, Kuala Lumpur',
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Hello World',
    email: 'helloworld@example.com',
    contactno: '012-567-9856',
  });

  return (
    <>
      <Container>

      <div className='w-4/5 mt-6 mx-auto'>
        <div className='flex items-center'>
          <h2 className='font-poppins font-bold text-2xl'>User Profile</h2>
          <Link
            to='/' // Link to Preview
            className='text-md font-bold hover:text-primary text-gray-400 underline transition duration-200 mt-1 ml-4'
          >
            Preview
          </Link>
        </div>

        <div className='flex justify-center space-x-4 mx-auto'>
          <Card
            header='Company Information'
            Icon={CiEdit}
            onClick={isEditingCompany ? null : () => handleEdit('company')}
            tooltip='Edit'
          >
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
                  value={companyInfo.companyname}
                  onChange={handleCompanyChange}
                  disabled={!isEditingCompany}
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
                  value={companyInfo.companyemail}
                  onChange={handleCompanyChange}
                  disabled={!isEditingCompany}
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
                  value={companyInfo.companycontact}
                  onChange={handleCompanyChange}
                  disabled={!isEditingCompany}
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
                  value={companyInfo.address}
                  onChange={handleCompanyChange}
                  disabled={!isEditingCompany}
                />
              </div>
              {isEditingCompany && (
                <div className='flex justify-between'>
                  <CustomButton
                    title={'Cancel'}
                    className={
                      'w-40 bg-white hover:bg-indigo-50 text-[#0A21C0] border border-primary mt-5'
                    }
                    onClick={() => handleCancel('company')}
                  />
                  <CustomButton
                    title={'Save'}
                    className={'w-40 mt-5'}
                    onClick={() => handleSave('company')}
                  />
                </div>
              )}
            </div>
          </Card>

          <Card
            header='Personal Information'
            Icon={CiEdit}
            onClick={isEditingPersonal ? null : () => handleEdit('personal')}
            tooltip='Edit'
          >
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
                  className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                  placeholder='Enter your fullname'
                  value={personalInfo.fullName}
                  onChange={handlePersonalChange}
                  disabled={!isEditingPersonal}
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-poppins font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='text'
                  id='email'
                  className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                  placeholder='Enter email'
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  disabled={!isEditingPersonal}
                />
              </div>
              <div>
                <label
                  htmlFor='contactno'
                  className='block text-sm font-poppins font-medium text-gray-700'
                >
                  Contact No.
                </label>
                <input
                  type='text'
                  id='contactno'
                  className='w-full h-12 p-2 rounded ring-1 ring-gray-300 focus:ring-primary focus:outline-none font-poppins text-sm text-gray-500 mt-1'
                  placeholder='Enter contact number'
                  value={personalInfo.contactno}
                  onChange={handlePersonalChange}
                  disabled={!isEditingPersonal}
                />
              </div>
              {isEditingPersonal && (
                <div className='flex justify-between'>
                  <CustomButton
                    title={'Cancel'}
                    className={
                      'w-40 bg-white hover:bg-indigo-50 text-[#0A21C0] border border-primary mt-5'
                    }
                    onClick={() => handleCancel('personal')}
                  />
                  <CustomButton
                    title={'Save'}
                    className={'w-40 mt-5'}
                    onClick={() => handleSave('personal')}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className='flex space-x-4'>
          <div className='w-1/3 flex flex-col'>
            <Card
              header='Company Profile'
              Icon={CiEdit}
              onClick={handleEdit}
              tooltip='Edit'
              className='flex-grow'
            >
              <FilesUploadButton
                  setImages={setImages}
                  initialFiles={images.map((name) => new File([], name))}
                  maxFiles={2}
                  maxFileSize={2 * 1024 * 1024}
                  aspectRatio="square"
              />
            </Card>
          </div>

          <div className='w-2/3 flex flex-col'>
            <Card
              header='Bus Photos'
              Icon={CiEdit}
              onClick={handleEdit}
              tooltip='Edit'
              className='flex-grow'
            >
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
        </div>

        <div>
          <Card
            header='Bio'
            Icon={CiEdit}
            onClick={isEditingBio ? null : () => handleEdit('bio')}
            tooltip='Edit'
          >
            {showBioFields && (
              <>
                <CustomField
                  id={'title'}
                  name={'title'}
                  placeholder={'Title'}
                  type={'text'}
                  required
                  icon={MdOutlineTitle}
                />
                <CustomField
                  id={'content'}
                  name={'content'}
                  placeholder={'Content'}
                  type={'text'}
                  required
                  icon={MdOutlineSubtitles}
                />
              </>
            )}
            {isEditingBio && (
              <div className='flex justify-between'>
                <CustomButton
                  title={'Cancel'}
                  className={
                    'w-40 bg-white hover:bg-indigo-50 text-[#0A21C0] border border-primary mt-5'
                  }
                  onClick={() => handleCancel('bio')}
                />
                <CustomButton
                  title={'Save'}
                  className={'w-40 mt-5'}
                  onClick={() => handleSave('bio')}
                />
              </div>
            )}
            <CustomButton
              title={
                <>
                  <IoMdAddCircleOutline
                    className='inline-block mr-2 mb-1'
                    size={22}
                  />
                  Add Bio
                </>
              }
              onClick={handleAddBio}
              disabled={isBioDisabled}
            />
          </Card>
        </div>
      </div>

      </Container>
    </>
  );
};

export default UserProfile;
