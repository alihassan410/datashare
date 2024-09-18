import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import EditProduct from './EditProduct';
import { useParams } from 'react-router-dom';

const EditProductLayout = () => {
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
                    <EditProduct id={params.id} />
                </div>
            </div>
        </div>
    );
};

export default EditProductLayout;
