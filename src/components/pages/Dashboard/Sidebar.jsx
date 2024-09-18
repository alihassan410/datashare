import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUser,
  FiBarChart2,
  FiSettings,
  FiDroplet,
  FiArchive,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaMoneyBill, FaChartPie, FaWeight, FaBox } from "react-icons/fa";
import { TiWeatherCloudy, TiShoppingCart } from "react-icons/ti";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path) ? "bg-gray-700" : "";

  return (
    <>
      {isOpen ? (
        <button
          className="absolute top-5 right-5 focus:outline-none sm:hidden z-50"
          onClick={toggleSidebar}
        >
          <FiX className="text-white text-xl" />
        </button>
      ) : (
        <button
          className="absolute top-5 left-5 focus:outline-none sm:hidden z-50"
          onClick={toggleSidebar}
        >
          <FiMenu className="text-white text-xl" />
        </button>
      )}

      <div
        className={`bg-gray-800 text-white h-full overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-0"
          } sm:w-64 fixed sm:static inset-y-0 left-0 z-50 sm:z-40`}
      >
        {/* Sidebar Content */}
        <div className="p-7">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={`flex items-center p-3 mb-7 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard"
            )}`}
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>

          {/* Manage Milk */}
          <Link
            to="/dashboard/manage_milk"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_milk"
            )}`}
          >
            <FiDroplet className="mr-3" />
            Manage Milk
          </Link>

          <Link
            to="/dashboard/add_weight"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/add_weight"
            )}`}
          >
            <FaWeight className="mr-3" />
            Add Weight
          </Link>

          {/* Manage Meat */}
          <Link
            to="/dashboard/manage_meat"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_meat"
            )}`}
          >
            <FiDroplet className="mr-3" />
            Manage Meat
          </Link>

          {/* Other Management Sections */}
          <Link
            to="/dashboard/manage_animal"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_animal"
            )}`}
          >
            <FiUsers className="mr-3" />
            Manage Animal
          </Link>
          <Link
            to="/dashboard/manage_product"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_product"
            )}`}
          >
            <FaBox className="mr-3" />
            Manage Product
          </Link>
          <Link
            to="/dashboard/manage_employee"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_employee"
            )}`}
          >
            <FiUser className="mr-3" />
            Manage Employee
          </Link>
          <Link
            to="/dashboard/manage_admin"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_admin"
            )}`}
          >
            <FiUser className="mr-3" />
            Manage Admin
          </Link>
          <Link
            to="/dashboard/disease_detection"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/disease_detection"
            )}`}
          >
            <FiDroplet className="mr-3" />
            Disease Detection
          </Link>
          <Link
            to="/dashboard/manage_inventory"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_inventory"
            )}`}
          >
            <FiArchive className="mr-3" />
            Manage Inventory
          </Link>
          <Link
            to="/dashboard/weather"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/weather"
            )}`}
          >
            <TiWeatherCloudy className="mr-3" />
            Weather Control
          </Link>
          <Link
            to="/dashboard/manage_expense"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_expense"
            )}`}
          >
            <FaMoneyBill className="mr-3" />
            Manage Expenses
          </Link>
          <Link
            to="/dashboard/manage_sale"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/manage_sale"
            )}`}
          >
            <TiShoppingCart className="mr-3" />
            Manage Sales
          </Link>
          <Link
            to="/dashboard/loss_profit"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/loss_profit"
            )}`}
          >
            <FaChartPie className="mr-3" />
            Loss & Profit
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="p-9">
          {/* Settings Link */}
          <Link
            to="/dashboard/settings"
            className={`flex items-center p-3 hover:bg-gray-700 rounded-md ${isActive(
              "/dashboard/settings"
            )}`}
          >
            <FiSettings className="mr-3" />
            Settings
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
