import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import AddProduct from './AddProduct';

const AddProductLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar and Main Content */}
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Dashboard Content */}
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default AddProductLayout;
