import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { busManagementTabs } from '../../../constants/TabItems';
import Container from '../../../components/Container';
import Tabs from '../../../components/common/Tabs';

const ManageBus = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <>
      <Container>

      <div className='w-4/5 mt-8 mx-auto'>
        <div className='flex items-center'>
          <h2 className='font-poppins font-bold text-2xl'>Bus Management</h2>
        </div>
        
        <div className='mt-2'>
          <Tabs tabs={busManagementTabs} activeTabProp={activeTab}/>
        </div>
      </div>
      
      </Container>
    </>
  );
};

export default ManageBus;
