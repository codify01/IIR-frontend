import React from "react";
import { Link, useParams } from "react-router-dom";
import img12 from "../../assets/image/img12.png";
import { FaChevronLeft } from "react-icons/fa";

const AdminProfile: React.FC = () => {
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

    const filteredId = users.filter((user) => user.id === Number(id));
    console.log("filteredId", filteredId);

    if (!filteredId.length) {
        return <div className="lg:text-tet text-sec space-y-3">
                    <h3 className="font-bold text-4xl">User not found</h3>
                    <Link to={"/superadmin/manageadmin"} className="flex border justify-center gap-3">
                        <FaChevronLeft className="size-6" />
                        <span>Back to users</span>
                    </Link>
                </div>;
    }

    
    return (

        <div className="relative lg:bg-pry/25 bg-sec lg:w-full md:w-4/5 w-full py-5 md:px-8 px-4 rounded-lg font-semibold">
            <div className="flex justify-center mb-5">
                <Link className="flex items-center opacity-60 absolute top-4 left-4" to={"/superadmin/manageadmin"}>
                    <FaChevronLeft className="size-6" />
                    <span>Close</span>
                </Link>
                <h2 className="w-2/3 text-2xl text-center">{filteredId[0].fName}'s Details</h2>
            </div>

            <div className="grid gap-3">
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

            <div className="text-center w-full">
                <button className={`mt-8 mx-auto bg-red-600 text-sec rounded-lg shadow-xl py-3 w-1/2 hover:shadow-none hover:scale-[0.95] whitespace-nowrap transition-all`}>Delete User</button>
            </div>

        </div>

    );
};

export default AdminProfile;
