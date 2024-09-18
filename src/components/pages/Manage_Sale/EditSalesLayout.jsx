import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import EditSale from './EditSales';
import { useParams } from 'react-router-dom';

const EditSaleLayout = () => {
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
                    <EditSale id={params.id} />
                </div>
            </div>
        </div>
    );
};

export default EditSaleLayout;
