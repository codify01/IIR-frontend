import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_URL;

const Withdraw: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiURL}/user.php`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        setUser(response.data);
      } catch (error: any) {
        toast.error("Failed to fetch user details");
      }
    };
    fetchUser();
  }, []);

  const balance = user?.total_deposit || 0;

  const handlePercentCut = (percent: number, balance: number) => {
    let calculatedAmount = (percent / 100) * balance;
    formik.setFieldValue("amount", Number(calculatedAmount.toFixed(2))); // Update Formik's state
  };

  const formik = useFormik({
    initialValues: {
      amount: 0,
      accountNumber: "",
      accountName: "",
      bankName: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Amount is required")
        .min(1, "Amount must be greater than 0"),
      accountNumber: Yup.string().required("Account Number is required"),
      accountName: Yup.string().required("Account Name is required"),
      bankName: Yup.string().required("Bank Name is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(
          `${apiURL}/postWithdrawal.php`,
          values,
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        
        toast.success("Withdrawal request submitted successfully!");
        resetForm();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while processing your withdrawal."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const banks = [
    "Select a bank",
    "GTB",
    "Zenith Bank",
    "UBA",
    "First Bank",
    "Access Bank",
    // Add more banks as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10 text-gray-800">
      <h1 className="text-2xl font-bold text-pry text-center mb-5">
        Withdrawal Request
      </h1>
      <form
        className="grid grid-cols-1 gap-y-6"
        onSubmit={formik.handleSubmit}
      >
        {/* Amount */}
        <div className="relative">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount to withdraw"
            className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            value={formik.values.amount}
            onFocus={() => setIsFocused(true)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="error text-red-600 mt-1 text-sm">
              {formik.errors.amount}
            </div>
          )}
          {isFocused && (
            <div className="flex items-center gap-2 mt-2">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  className="flex-1 border border-pry bg-pry/10 hover:bg-pry hover:text-sec py-2 rounded-md text-sm transition-all"
                  onClick={() => handlePercentCut(percent, balance)}
                >
                  {percent}%
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label
            htmlFor="accountNumber"
            className="block text-sm font-medium mb-2"
          >
            Account Number
          </label>
          <input
            type="number"
            name="accountNumber"
            id="accountNumber"
            placeholder="Enter recepient's account number"
            className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.accountNumber && formik.errors.accountNumber && (
            <div className="error text-red-600 mt-1 text-sm">
              {formik.errors.accountNumber}
            </div>
          )}
        </div>

        {/* Account Name */}
        <div>
          <label
            htmlFor="accountName"
            className="block text-sm font-medium mb-2"
          >
            Account Name
          </label>
          <input
            type="text"
            name="accountName"
            id="accountName"
            placeholder="Enter recepient's account name"
            className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            value={formik.values.accountName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.accountName && formik.errors.accountName && (
            <div className="error text-red-600 mt-1 text-sm">
              {formik.errors.accountName}
            </div>
          )}
        </div>

        {/* Bank Name */}
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium mb-2">
            Recipient Bank
          </label>
          <select
            name="bankName"
            id="bankName"
            className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            defaultValue={"Select a bank"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          {formik.touched.bankName && formik.errors.bankName && (
            <div className="error text-red-600 mt-1 text-sm">
              {formik.errors.bankName}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-5">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-pry text-sec font-semibold px-6 py-3 rounded-md w-full hover:bg-pry/90 focus:ring-2 focus:ring-pry focus:ring-offset-2 transition-all"
          >
            {formik.isSubmitting ? "Processing..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
