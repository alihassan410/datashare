import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import AddInventory from './AddInventory';
import EditInventory from './EditInventory';
import { useParams } from 'react-router-dom';

const EditInventoryLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const params = useParams();
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
                    <EditInventory id={params.id} />
                </div>
            </div>
        </div>
    );
};

export default EditInventoryLayout;
