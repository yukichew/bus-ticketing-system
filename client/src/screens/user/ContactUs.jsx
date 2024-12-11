import React from 'react';
import Container from '../../components/Container';
import Card from '../../components/common/Card';
import CustomButton from '../../components/common/CustomButton';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import banner from '../../assets/service.png';

const ContactUs = () => {
  const position = [3.056069, 101.700466];

  const markerIcon = new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <Container>
      <p className='text-center font-bold text-4xl text-gray-600 pt-[50px]'>
        CONTACT US
      </p>

      <div className='w-4/5 mt-3 mx-auto flex flex-col md:flex-row gap-12'>
        <Card>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center pl-6'>
            <div className='flex flex-col space-y-4 text-left'>
              <header className='text-3xl font-semibold text-[#465986]'>
                Need help with your booking?
              </header>
              <h2 className='text-base font-medium text-[#3E3E52] pb-4'>
                Get in touch and let us know how we can help
              </h2>
              <CustomButton
                title={'Send us a message'}
                type={'button'}
                onClick={() =>
                  (window.location.href = 'mailto:ridengo.info@gmail.com')
                }
                className={'w-1/2 md:w-1/3 pb-8'}
              />
            </div>
            <div className='flex justify-end items-center'>
              <img
                src={banner}
                alt='Contact Us Banner'
                className='max-w-sm h-auto'
              />
            </div>
          </div>
        </Card>
      </div>

      <div className='w-4/5 mt-10 mx-auto pt-4 pb-8'>
        {/* embedded map */}
        <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
          <div className='flex flex-col items-center text-center'>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ width: '100%', height: '400px' }}
            >
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              <Marker
                position={position}
                icon={markerIcon}
              >
                <Popup>
                  Asia Pacific University, Jalan Teknologi, Bukit Jalil, Kuala
                  Lumpur.
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* contacts */}
          <div className='text-gray-700 space-y-2 grid grid-cols-1'>
            <div className='ml-10'>
              <p className='mt-2 text-xl font-semibold mb-1'>Address</p>
              <p className='text-sm'>
                Jalan Teknologi 5, Taman Teknologi Malaysia, 57000 Kuala Lumpur,
                Wilayah Persekutuan Kuala Lumpur
              </p>
            </div>

            <div className='ml-10'>
              <p className='mt-2 text-lg font-semibold mb-1'>Contact</p>
              <p className='text-sm'>
                <FaPhoneAlt className='inline-block mr-2' />
                <a href='tel:+60123456789'>(+60) 12-345 6789</a>
              </p>
            </div>

            <div className='ml-10'>
              <p className='mt-2 text-lg font-semibold mb-1'>Email</p>
              <p className='text-sm'>
                <MdEmail className='inline-block mr-2' />
                <a href='mailto:ridengo.info@gmail.com'>
                  ridengo.info@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
