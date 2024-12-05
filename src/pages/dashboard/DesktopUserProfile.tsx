import React, { useState, ReactNode } from 'react';
import { MdAddCard, MdEmail } from 'react-icons/md';
import ProfileCard from '../../components/card/ProfileCard';
import { FaCreditCard } from 'react-icons/fa';
import { PiNotebookFill } from 'react-icons/pi';

const DesktopUserProfile = () => {
    const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

    const profileList: { name: string; description: string; icon: ReactNode; details: ReactNode }[] =
        [
            {
                name: 'OTP Verification',
                description: 'Verify your account with OTP',
                icon: <MdAddCard size={30} />,
                details: <p>Enter the OTP sent to your registered mobile number to verify your account.</p>,
            },
            {
                name: 'Add Email',
                description: 'Add emails for information',
                icon: <MdEmail size={30} />,
                details: <p>Add a secondary email address to ensure you receive important updates.</p>,
            },
            {
                name: 'Add Card',
                description: 'Add bank card information',
                icon: <FaCreditCard size={30} />,
                details: <p>Securely add your bank card details for transactions.</p>,
            },
            {
                name: 'Terms and Condition',
                description: 'Read through all terms and conditions',
                icon: <PiNotebookFill size={30} />,
                details: <p>Review our terms and conditions to understand our policies.</p>,
            },
        ];

    return (
        <React.Fragment>
            <div className="hidden lg:flex">
                {/* Left Sidebar */}
                <div className="h-[84vh] overflow-hidden basis-2/5">
                    <div className="bg-white h-full">
                        <div className="space-y-3 pt-1 pb-6 overflow-y-scroll h-full">
                            {profileList.map(({ name, description, icon }, index) => (
                                <ProfileCard
                                    key={index}
                                    name={name}
                                    description={description}
                                    icon={icon}
                                    onClick={() => setSelectedProfile(index)} // Handle card click
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="bg-pry/40 basis-3/5 p-6">
                    {selectedProfile !== null ? (
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <h2 className="text-xl font-bold">{profileList[selectedProfile].name}</h2>
                            <p className="text-gray-600">{profileList[selectedProfile].description}</p>
                            <div className="mt-4">
                                {profileList[selectedProfile].details}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            <p>Select a profile option to view details here.</p>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default DesktopUserProfile;
