import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4">
            <div className="flex items-center">
                <Link to='/'>
                    <img src={logo} alt="Logo" className="w-[105px] h-[105px] md:w-[80px] h-[80px] rounded-full md:rounded-full" />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-white bg-blue-500 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-blue-800 transition duration-300 ease-in-out text-sm md:text-base">
                    <Link to="/">
                        Home
                    </Link>
                </button>
                <button className="text-white bg-blue-500 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-blue-800 transition duration-300 ease-in-out text-sm md:text-base">
                    <Link to="/AboutUs">
                        About us
                    </Link>
                </button>
                <button className="text-white bg-blue-500 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-blue-800 transition duration-300 ease-in-out text-sm md:text-base">
                    <Link to="/ContactUs">
                        Contact us
                    </Link>
                </button>
                <button className="text-white bg-blue-500 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-blue-800 transition duration-300 ease-in-out text-sm md:text-base">
                    <Link to="/login">
                        Login
                    </Link>
                </button>
                <button className="text-white bg-green-500 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-green-800 transition duration-300 ease-in-out text-sm md:text-base">
                    <Link to="/register">
                        Register
                    </Link>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
