import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import ButtonOne from "../../components/Button/Buttonone";
import Cardtwo from "../../components/card/Cardtwo";
import axios from "axios";

interface User {
  id: number;
  referral_code: string;
  referralBalance: number;
  referralBonus: number;
}

interface Referral {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  kyc: boolean;
  referralBonus: number;
}

const apiURL = import.meta.env.VITE_API_URL;

const ManageReferrals: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [referralList, setReferralList] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refBalVisibility, setRefBalVisibility] = useState<boolean>(true);

  const accountNumber = user?.referral_code;

  const handleCopy = () => {
    if (accountNumber) {
      navigator.clipboard
        .writeText(accountNumber)
        .then(() => toast.success("Copied successfully!"))
        .catch(() => toast.error("Failed to copy. Try again."));
    } else {
      toast.error("No referral code available.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user details
        const userResponse = await axios.get(`${apiURL}/user.php`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });

        const { id, referral_code, referralBalance, referralBonus } =
          userResponse.data;
        setUser({ id, referral_code, referralBalance, referralBonus });

        // Fetch referral details
        const referralResponse = await axios.post(
          `${apiURL}/userReferral.php`,
          { referral_id: localStorage.getItem("ident") },
          { headers: { "Content-Type": "application/json" } }
        );

        if (Array.isArray(referralResponse.data.data)) {
          setReferralList(referralResponse.data.data);
        } else {
          toast.error(referralResponse.data.message || "No referrals found.")
        }
      } catch (error) {
        toast.error("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[100px]">
          <div className="w-8 h-8 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="flex md:flex-row flex-col md:gap-6 gap-0">
            <div className="md:w-1/2 w-full">
              <Cardtwo
                balType="My Referral Balance"
                amount={user?.referralBalance || 0}
                thisState={refBalVisibility}
                cta="Receive Commission"
                action={() => setRefBalVisibility(!refBalVisibility)}
              />
            </div>
            <div className="space-y-6 md:w-1/2 w-full">
              <div className="w-full p-5 bal-card relative flex flex-col justify-between h-[115px] rounded-[20px] overflow-hidden z-[1] text-sec shadow-lg shadow-tet/30">
                <div className="space-y-2">
                  <b className="text-sm">My Referrals</b>
                  <div className="flex justify-between items-end">
                    <h3 className="text-5xl font-semibold">
                      {referralList.length || 0}
                    </h3>
                    <ButtonOne
                      title={"Refer More"}
                      href={"#referlink"}
                      optStyle2="w-max rounded-full -mb-3"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-5 bg-pry/55 p-2 rounded-[15px] shadow-lg">
                <input
                  type="text"
                  readOnly
                  className="indent-3 p-2 w-full bg-transparent font-semibold text-sec tracking-widest"
                  value={accountNumber || ""}
                />
                <button
                  className="bg-sec rounded-lg w-16 flex justify-center items-center shadow-lg"
                  onClick={handleCopy}
                >
                  <FaCopy className="text-pry size-5" />
                </button>
              </div>
            </div>
          </div>

          <h3 className="py-4 font-bold text-3xl">Referral List</h3>
          <div className="relative overflow-x-auto w-full text-sm bg-pry p-2 text-sec rounded-lg shadow-lg">
            <table className="whitespace-nowrap w-full text-center">
              <thead>
                <tr className="border-b-2 border-sec/20">
                  <th scope="col" className="py-4">S/N</th>
                  <th scope="col" className="py-4">Name</th>
                  <th scope="col" className="py-4">Bonus</th>
                  <th scope="col" className="py-4">KYC</th>
                </tr>
              </thead>
              <tbody>
                {referralList.length > 0 ? (
                  referralList.map(({ id, fullname, referralBonus, kyc }, index) => (
                    <tr key={id} className="border-b border-sec/20">
                      <td className="font-medium py-4">{index + 1}</td>
                      <td className="font-medium py-4">{fullname}</td>
                      <td className="font-medium py-4">{referralBonus}</td>
                      <td className="font-medium py-4">
                        {kyc ? "Verified" : "Not Verified"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-sec/20">
                    <td colSpan={4} className="font-bold text-2xl py-10">
                      No referrals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageReferrals;
