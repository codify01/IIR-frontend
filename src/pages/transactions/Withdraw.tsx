import React, { useEffect, useState } from "react";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_URL;

const Withdraw: React.FC = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiURL}/user.php`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        setUser(response.data);
        console.log("user",user);
        
      } catch (error: any) {
        toast.error("Failed to fetch user details");
      }
    };
    fetchUser();
  }, []);

  const formatAccountBalance = (amount: number) => {
    return `NGN ${amount?.toLocaleString("en-NG")}`;
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
        .min(1, "Amount must be greater than 0")
        .max(user?.balance, "Amount exceeds your balance"),
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
    "Access Bank Plc",
    "Accion Microfinance Bank",
    "Citibank Nigeria Limited",
    "Coronation Merchant Bank",
    "Ecobank Nigeria Plc",
    "Empire Trust Microfinance Bank",
    "FBNQuest Merchant Bank",
    "Fidelity Bank Plc",
    "First Bank of Nigeria Limited",
    "First City Monument Bank Plc",
    "Finca Microfinance Bank",
    "FSDH Merchant Bank",
    "Globus Bank Limited",
    "Guaranty Trust Bank Plc",
    "Heritage Banking Company Limited",
    "Infinity Microfinance Bank",
    "Jaiz Bank Plc",
    "Keystone Bank Limited",
    "Kuda Bank",
    "LAPO Microfinance Bank",
    "Lotus Bank Limited",
    "Moniepoint",
    "Nova Merchant Bank",
    "Opay",
    "PalmPay",
    "Paga",
    "Parallex Bank Limited",
    "Peace Microfinance Bank",
    "Polaris Bank Limited",
    "Premium Trust Bank",
    "Providus Bank Limited",
    "Rand Merchant Bank",
    "Rephidim Microfinance Bank",
    "Signature Bank Limited",
    "Stanbic IBTC Bank Plc",
    "Standard Chartered Bank",
    "Sterling Bank Plc",
    "Sterling Financial Holdings",
    "SunTrust Bank Nigeria Limited",
    "Taj Bank Limited",
    "Titan Trust Bank Limited",
    "Union Bank of Nigeria Plc",
    "United Bank for Africa Plc",
    "Unity Bank Plc",
    "VFD Microfinance Bank",
    "Wema Bank Plc",
    "Zenith Bank Plc",
    "Flutterwave",
    "Paystack",
    "PiggyVest",
    "PocketApp by PiggyVest"
];


  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-5 text-gray-800">
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
            type="text"
            name="amount"
            id="amount"
            placeholder="Enter amount to withdraw"
            className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            value={formik.values.amount ? formik.values.amount.toLocaleString("en-NG") : formik.values.amount}
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(value))) {
                formik.setFieldValue("amount", Number(value));
              }
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="error text-red-600 mt-1 text-sm">
              {formik.errors.amount}
            </div>
          )}
          <div className="mt-1">
            Available balance: {formatAccountBalance(user?.balance) || 0}
          </div>
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
              <option disabled={bank === "Select a bank" ? true : false} key={index} value={bank}>
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

        {/* Target Account */}
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium mb-2">
            Withdrawal Account
          </label>
          <select
            name="bankName"
            id="bankName"
            className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            defaultValue={"Pick an account"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
              <option disabled>Pick an account</option>
              <option>Main Balance</option>
              <option>Referral Balance</option>
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
