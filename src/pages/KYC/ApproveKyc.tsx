import React, { useState } from 'react';
import img13 from "../../assets/image/img13.jfif";
import img14 from "../../assets/image/img14.png";

const ApproveKyc: React.FC = () => {

    const depositRequests:{ email: string; id1: string; id2: string; id3: string; }[] = [
        {
            email: "adelekeoluwamayokun27@gmail.com",
            id1: img13,
            id2: img14,
            id3: img13,
        },
        {
            email: "adelekeoluwamayokun27@gmail.com",
            id1: img14,
            id2: img13,
            id3: img14,
        },
    ]

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

        <div>
            <div className="thissss relative overflow-x-auto w-full max-h-[85.5vh] text-xs bg-pry p-2 text-sec rounded-md shadow-lg shadow-tet/30">
                <table className="whitespace-nowrap w-full text-center">
                    <thead>
                        <tr className='border-b-2 border-sec/20'>
                            <th scope="col" className="py-4">S/N</th>
                            <th scope="col" className="py-4">User Email</th>
                            <th scope="col" className="py-4">ID1</th>
                            <th scope="col" className="py-4">ID2</th>
                            <th scope="col" className="py-4">ID3</th>
                            <th scope="col" className="py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            depositRequests.length > 0 
                            ?
                            depositRequests.map(({email, id1, id2, id3}, index) => (
                                <tr key={index} className='border-b border-sec/20'>
                                    <td className="font-medium">{index + 1}</td>
                                    <td className="font-medium">{email}</td>
                                    <td className="font-medium">
                                        <div className="lg:w-full w-[150px]">
                                            <img src={id1} className="mx-auto object-fill w-full h-[100px]" alt={"Document"} onClick={() => openModal(id1)} />
                                        </div>
                                    </td>
                                    <td className="font-medium">
                                        <div className="lg:w-full w-[150px]">
                                            <img src={id2} className="mx-auto object-fill w-full h-[100px]" alt={"Document"} onClick={() => openModal(id2)} />
                                        </div>
                                    </td>
                                    <td className="font-medium">
                                        <div className="lg:w-full w-[150px]">
                                            <img src={id3} className="mx-auto object-fill w-full h-[100px]" alt={"Document"} onClick={() => openModal(id3)} />
                                        </div>
                                    </td>
                                    <td className="font-medium space-y-3 grid">
                                        <button className='bg-sec text-tet p-3 rounded-lg shadow-lg shadow-tet/30 w-full mx-auto'>Accept KYC</button>
                                        <button className='bg-red-600 text-sec p-3 rounded-lg shadow-lg shadow-tet/30 w-full mx-auto'>Reject KYC</button>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr className='border-b border-sec/20'>
                                <td colSpan={6} className="text-center text-3xl py-10 font-bold">No Pending KYC Validation...!</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-pry/55 py-10 flex justify-center items-center z-50 px-4">
                        <div className="bg-sec p-5 rounded-md shadow-lg md:w-1/2 w-full text-center">
                            <div className="w-3/5 mx-auto">
                                <img src={selectedImage} alt="Selected Document" className="w-full h-full rounded-md" />
                            </div>
                            <button
                                className="mt-4 w-1/2 bg-pry/55 text-tet font-bold shadow-lg shadow-tet/20 px-4 py-2 rounded-md transition"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )
            }
        </div>

    )

}

export default ApproveKyc