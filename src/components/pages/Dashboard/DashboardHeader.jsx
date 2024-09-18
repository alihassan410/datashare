import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { logout } from '../../../api/internal';
import { resetUser } from '../../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(resetUser());
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 w-full">
      {/* Empty div to take up space on the left */}
      <div className="flex-grow"></div>

      {/* Notification Bell and Logout Button */}
      <div className="flex items-center">
        {/* Profile Icon (You can customize this according to your user profile) */}
        <div className="ml-auto">
          <FaUser className="text-white text-2xl mr-4" />
        </div>

        {/* Bell Icon for Notifications */}
        <FaBell className="text-white text-2xl mr-4 cursor-pointer" />

        {/* Logout Button */}
        <button className="text-white" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
