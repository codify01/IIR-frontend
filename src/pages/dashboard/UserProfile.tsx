import React, { useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import {
    IoCallOutline,
    IoLocationOutline,
    IoPencilSharp,
} from 'react-icons/io5';
import { MdAddCard, MdEmail } from 'react-icons/md';
import ProfileCard from '../../components/card/ProfileCard';
import { FaCreditCard } from 'react-icons/fa';
import { PiNotebookFill } from 'react-icons/pi';
import Bottombar from '../../components/nav/Bottombar';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

    const profileList: { name: string; description: string; icon: React.ReactNode; details: React.ReactNode }[] = [
        {
            name: 'OTP Verification',
            description: 'Verify your account with OTP',
            icon: <MdAddCard size={30} />,
            details: <p>Verify your account by entering the OTP sent to your phone.</p>,
        },
        {
            name: 'Add Email',
            description: 'Add emails for information',
            icon: <MdEmail size={30} />,
            details: <p>Ensure you have a secondary email address for account recovery.</p>,
        },
        {
            name: 'Add Card',
            description: 'Add bank card information',
            icon: <FaCreditCard size={30} />,
            details: <p>Securely add your card details for seamless transactions.</p>,
        },
        {
            name: 'Terms and Condition',
            description: 'Read through all terms and conditions',
            icon: <PiNotebookFill size={30} />,
            details: <p>Familiarise yourself with our terms and conditions to avoid any misunderstandings.</p>,
        },
    ];

    return (
        <div className="h-screen bg-pry overflow-hidden lg:hidden relative">
            {/* Header Section */}
            <div className="text-white h-[20vh] bg-whit flex items-center justify-between px-10">
                <Link to={'user/notificaton'}><h3 className="text-lg font-semibold">Notification</h3></Link>
                <IoMdSettings className="size-5" />
            </div>
            
            {/* Main Section */}
            <div className="h-[80vh] bg-white rounded-t-3xl relative overflow-hidde">
                <div className="h-full mContainer relative">
                    {/* Profile Information */}
                    <div className="h-[20vh]">
                        <img
                            src="https://images.pexels.com/photos/13629871/pexels-photo-13629871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="w-24 aspect-square object-cover rounded-full mx-auto relative -top-12"
                        />
                        <div className="space-y-5 pb-3 -mt-10">
                            <div className="flex items-center gap-2 justify-center text-xl">
                                <span>Feranmi Racheal</span>
                                <IoPencilSharp className="text-pry" />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 justify-center text-sm">
                                    <IoLocationOutline className="size-4 text-pry" />
                                    <span>24, Mauve Avenue Lagos</span>
                                </div>
                                <div className="flex items-center gap-2 justify-center text-sm">
                                    <IoCallOutline className="size-4 text-pry" />
                                    <span>+234 904 2219 162</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile List */}
                    <div className="space-y-3 pt-1 pb-6 overflow-y-scroll h-[60vh]">
                        {profileList.map(({ name, description, icon }, index) => (
                            <ProfileCard
                                key={index}
                                name={name}
                                description={description}
                                icon={icon}
                                onClick={() => setSelectedProfile(index)}
                            />
                        ))}
                    </div>

                    {/* Sliding Info Section */}
                    <div
                        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transition-transform duration-500 ${
                            selectedProfile !== null ? 'translate-x-0' : 'translate-x-full'
                        }`}
                        style={{ width: '85%' }}
                    >
                        <button
                            className="absolute top-4 left-4 text-gray-500"
                            onClick={() => setSelectedProfile(null)}
                        >
                            Close
                        </button>

                        {/* Profile Details */}
                        {selectedProfile !== null && (
                            <div className="p-6 mt-5">
                                <h2 className="text-xl font-semibold mb-2">
                                    {profileList[selectedProfile].name}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {profileList[selectedProfile].description}
                                </p>
                                <div>{profileList[selectedProfile].details}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <Bottombar />
        </div>
    );
};

export default UserProfile;
