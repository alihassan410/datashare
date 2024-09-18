import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            We'd love to hear from you! Reach out to us using any of the methods below.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Phone */}
                        <div className="flex items-center">
                            <div className="p-4 bg-indigo-600 text-white rounded-full shadow-lg">
                                <FaPhoneAlt className="text-2xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-800">Call Us</h2>
                                <p className="mt-1 text-gray-600">03400000000</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center">
                            <div className="p-4 bg-indigo-600 text-white rounded-full shadow-lg">
                                <FaEnvelope className="text-2xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-800">Email Us</h2>
                                <p className="mt-1 text-gray-600">memoona@gmail.com</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center">
                            <div className="p-4 bg-indigo-600 text-white rounded-full shadow-lg">
                                <FaMapMarkerAlt className="text-2xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-800">Visit Us</h2>
                                <p className="mt-1 text-gray-600">baghi, Jhang, Pakistan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
