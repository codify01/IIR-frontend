import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import img12 from "../../assets/image/img12.png";
import img13 from "../../assets/image/img13.jfif";
import img14 from "../../assets/image/img14.png";

// import "swiper/css";
// import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,} from "swiper/modules";
import { FaChevronLeft } from "react-icons/fa";
import CardFour from "../../components/card/Cardfour";

const InvestorProfile: React.FC = () => {
    const { id } = useParams();

    const users: { id: number; fName: string; lName: string; email: string; phone: string; kyc: boolean }[] = [
    {
        id: 1,
        fName: "John",
        lName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        kyc: true,
    },
    {
        id: 2,
        fName: "Jane",
        lName: "Smith",
        email: "jane.smith@example.com",
        phone: "1234567890",
        kyc: true,
    },
    {
        id: 3,
        fName: "Alice",
        lName: "Johnson",
        email: "alice.johnson@example.com",
        phone: "1234567890",
        kyc: false,
    },
    ];

    const myInvestments: { amount: number; roi: number; duration: string; interestRate: string; payoutDate: string;startDate: string; endDate: string; }[] = [
        {
          amount: 50000,
          roi: 80000,
          duration: "6 months",
          interestRate: "10%",
          payoutDate: "16th Nov 2024",
          startDate: "2024-11-17T13:10:00",
          endDate: "2024-11-18T17:10:00",
        },
        {
          amount: 100000,
          roi: 196000,
          duration: "12 months",
          interestRate: "15%",
          payoutDate: "16th Dec 2024",
          startDate: "2024-11-17T13:10:00",
          endDate: "2024-11-19T17:40:00",
        },
    ];

    const filteredId = users.filter((user) => user.id === Number(id));
    console.log("filteredId", filteredId);

    if (!filteredId.length) {
        toast.error("User not found")
        return <div className="lg:text-tet text-sec space-y-3">
                    <h3 className="font-bold text-4xl">User not found</h3>
                    <Link to={"/admin/manageinvestors"} className="flex justify-center gap-5">
                        <FaChevronLeft className="size-6" />
                        <span>Back to users</span>
                    </Link>
                </div>;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");

    const openModal = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage("");
    };

    return (

        <div className="relative lg:bg-pry/25 bg-sec lg:w-full md:w-4/5 w-full py-5 md:px-8 px-4 rounded-lg font-semibold">
            <div className="flex justify-center mb-5">
                <Link className="flex items-center opacity-60 absolute top-4 left-4" to={"/admin/manageinvestors"}>
                    <FaChevronLeft className="size-6" />
                    <span>Close</span>
                </Link>
                <h2 className="w-2/3 text-2xl text-center">{filteredId[0].fName}'s Details</h2>
            </div>
            <Swiper
                modules={[Navigation]}
                navigation
                className="mySwiper profile-swiper"
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 1 },
                    640: { slidesPerView: 1, spaceBetween: 1 },
                    1024: { slidesPerView: 1, spaceBetween: 1 },
                    1280: { slidesPerView: 1, spaceBetween: 1 },
                }}
            >
                {/* Display Image */}
                <SwiperSlide>
                    <div className="grid gap-3">
                        <h3 className="mb-2 text-center">Profile</h3>
                        <div className="w-1/3 mx-auto border-4 border-pry rounded-full overflow-hidden">
                            <img src={img12} alt="..." className="w-full h-full object-cover" />
                        </div>
                        {filteredId.map(({ id, fName, lName, email, phone, kyc }) => (
                            <ul key={id} className="flex flex-col gap-3">
                            <li className="flex justify-between items-center gap-2 md:text-sm text-xs">
                                <span>Full Name:</span>
                                <span className="font-bold">{`${fName} ${lName}`}</span>
                            </li>
                            <li className="flex justify-between items-center gap-2 md:text-sm text-xs">
                                <span>Email Address:</span>
                                <span className="font-bold">{email}</span>
                            </li>
                            <li className="flex justify-between items-center gap-2 md:text-sm text-xs">
                                <span>Phone Number:</span>
                                <span className="font-bold">{phone}</span>
                            </li>
                            <li className="flex justify-between items-center gap-2 md:text-sm text-xs">
                                <span>KYC Verification:</span>
                                <span className="font-bold">{kyc === true ? "Verified" : "Not verified"}</span>
                            </li>
                            </ul>
                        ))}
                    </div>
                </SwiperSlide>
                {/* Display Documents */}
                <SwiperSlide>
                    <div className="grid gap-3">
                        <h3 className="mb-2 text-center">KYC Documents</h3>
                        <div className="lg:h-[200px] md:h-[300px] h-[200px]">
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                loop
                                direction="vertical"
                                className="mySwiper document-swiper h-full"
                                slidesPerView={1}
                            >
                                { 
                                    [img12, img13, img14].filter(Boolean).map((img, index) => (
                                        <SwiperSlide key={index} className="text-center">
                                            <img src={img} className="h-full w-3/4 object-contain mx-auto" alt={`Document ${index + 1}`} onClick={() => openModal(img)} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Display Investments */}
                <SwiperSlide>
                    <div className="grid gap-3 ">
                        <h3 className="text-center">Current Investments</h3>
                        <div className="h-[280px] whitespace-nowrap">
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                direction="vertical"
                                className="mySwiper document-swiper investment-swiper h-full"
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 10 },
                                    640: { slidesPerView: 1, spaceBetween: 10 },
                                    1024: { slidesPerView: 1, spaceBetween: 10 },
                                    1280: { slidesPerView: 1, spaceBetween: 10 },
                                }}
                            >
                                { 
                                    myInvestments.map(({ amount, roi, duration, interestRate, payoutDate, startDate, endDate }, index) => (
                                        <SwiperSlide key={index} className="md:text-sm text-xs">
                                            <CardFour key={index} roi={roi} amount={amount} duration={duration} interestRate={interestRate} payoutDate={payoutDate} startDate={startDate} endDate={endDate}/>
                                        </SwiperSlide>
                                      ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


            <div className="text-center w-full">
                <button className={`mt-8 mx-auto bg-red-600 text-sec rounded-lg shadow-xl py-3 w-1/2 hover:shadow-none hover:scale-[0.95] whitespace-nowrap transition-all`}>Delete User</button>
            </div>


            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-pry/55 py-10 flex justify-center items-center z-50 px-4">
                        <div className="bg-sec p-5 rounded-md shadow-lg md:w-1/2 w-full">
                            <div className="w-3/4 mx-auto">
                                <img src={selectedImage} alt="Selected Document" className="w-full h-full rounded-md" />
                            </div>
                            <div className="text-center">
                                <button
                                    className="mt-4 w-1/2 bg-red-600 text-sec px-4 py-2 rounded-md transition"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default InvestorProfile;
