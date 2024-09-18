import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import ShowAnimal from './ShowAnimal';

const ShowAnimalLayout = () => {
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
          <ShowAnimal />
        </div>
      </div>
    </div>
  );
};

export default ShowAnimalLayout;
