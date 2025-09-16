import React, { useState } from 'react';
import { toast } from 'sonner';

const initialUserData = {
    name: 'Vicky Swami',
    email: 'vickyswami9460@gmail.com',
    mobile: '6378141023',
};

const AccountAndInformation = () => {
    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
            toast.success("Details updated successfully!", { duration: 1000 });
        }, 1000);
    };

    const handlePasswordChange = () => {
        toast.info("Password change functionality is under development.", { duration: 2000 });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 mt-4 md:mt-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Account & Information</h1>

            {/* Personal Details Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h2>
                
                {isEditing ? (
                    // Editable Form
                    <div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={userData.mobile}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => {setIsEditing(false); setUserData(initialUserData);}}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className={`px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                ) : (
                    // Read-only view
                    <div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="block text-sm font-medium text-gray-600">Name</p>
                                    <p className="w-full mt-1 p-2 bg-gray-100 rounded-md">{userData.name}</p>
                                </div>
                                <div>
                                    <p className="block text-sm font-medium text-gray-600">Email Address</p>
                                    <p className="w-full mt-1 p-2 bg-gray-100 rounded-md">{userData.email}</p>
                                </div>
                            </div>
                            <div>
                                <p className="block text-sm font-medium text-gray-600">Mobile Number</p>
                                <p className="w-full mt-1 p-2 bg-gray-100 rounded-md">{userData.mobile}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                            >
                                Edit Details
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Password Management Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Password Management</h2>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Change your password to keep your account secure.</p>
                    <button
                        onClick={handlePasswordChange}
                        className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountAndInformation;
