import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_URL;

const ServiceAccountWithdrawal: React.FC = () => {

    const formatAccountBalance = (amount: number) => {
        return `NGN ${amount?.toLocaleString("en-NG")}`;
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<ResultProps[]>([]);

    interface ResultProps {
      id:number;
      investment_amount: number;
      investment_id:string;
      investor_name: number;
      service_fee: number;
      user_id: number;
    }

    useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      
      try {
        const response = await axios.post(`${apiURL}/serviceAccount.php`);
        if (response.data.status === "success") {
          try {
            const response2 = await axios.post(`${apiURL}/allService.php`);
            setResult(response2.data.data)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    };
    
    
    fetchData();
    console.log(result);
    }, []);

    const summa = result.reduce((sum, { service_fee }) => sum + Number(service_fee || 0), 0)

    const formik = useFormik({
        initialValues: {
          amount: 0,
          account_number: "",
          account_name: "",
          bank_name: "",
        },
        validationSchema: Yup.object({
          amount: Yup.number()
            .required("Amount is required")
            .min(1, "Amount must be greater than 0")
            .max(summa, "Amount exceeds your balance"),
          account_number: Yup.string().required("Account Number is required"),
          account_name: Yup.string().required("Account Name is required"),
          bank_name: Yup.string().required("Bank Name is required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
          console.log("values to be posted", values);
          
          try {
            // const token = localStorage.getItem("token") || "";
            const response = await axios.post(`${apiURL}/servicewithdraw.php`, values,
              {
                headers : {
                  Authorization: localStorage.getItem("token") || "",
                  "Content-Type": "application/json",
                }
              }
            );
            console.log("withdrawal response", response);
            toast.success("🎊 " + response.data.message);
            resetForm();
          } catch (error: any) {
            toast.error(
              error.response?.data?.message ||
                "An error occurred while processing your withdrawal."
            );
            console.log("error", error);
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

        <div className="p-2">
            <h1 className="text-2xl font-bold text-pry mb-5">
                Withdrawal Request
            </h1>
            {
              isLoading ? (
                <div className="flex justify-center items-center h-[150px]">
                  <div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
                </div>
              ) : (
              <form
                  className="grid md:grid-cols-2 grid-cols-1 gap-6"
                  onSubmit={formik.handleSubmit}
              >
                  {/* Amount */}
                  <div className="relative md:col-span-1 col-span-2">
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
                        Available balance: {formatAccountBalance(summa) || 0}
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="md:col-span-1 col-span-2">
                    <label
                        htmlFor="account_number"
                        className="block text-sm font-medium mb-2"
                    >
                        Account Number
                    </label>
                    <input
                        type="number"
                        name="account_number"
                        id="account_number"
                        placeholder="Enter recepient's account number"
                        className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
                        value={formik.values.account_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.account_number && formik.errors.account_number && (
                        <div className="error text-red-600 mt-1 text-sm">
                        {formik.errors.account_number}
                        </div>
                    )}
                  </div>

                  {/* Account Name */}
                  <div className="md:col-span-1 col-span-2">
                    <label
                        htmlFor="account_name"
                        className="block text-sm font-medium mb-2"
                    >
                        Account Name
                    </label>
                    <input
                        type="text"
                        name="account_name"
                        id="account_name"
                        placeholder="Enter recepient's account name"
                        className="input1 w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
                        value={formik.values.account_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.account_name && formik.errors.account_name && (
                        <div className="error text-red-600 mt-1 text-sm">
                        {formik.errors.account_name}
                        </div>
                    )}
                  </div>

                  {/* Bank Name */}
                  <div className="md:col-span-1 col-span-2">
                    <label htmlFor="bank_name" className="block text-sm font-medium mb-2">
                        Recipient Bank
                    </label>
                    <select
                        name="bank_name"
                        id="bank_name"
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
                    {formik.touched.bank_name && formik.errors.bank_name && (
                        <div className="error text-red-600 mt-1 text-sm">
                        {formik.errors.bank_name}
                        </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center col-span-2 mt-5">
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="bg-pry text-sec font-semibold px-6 py-3 rounded-md lg:w-1/3 w-full hover:bg-pry/90 focus:ring-2 focus:ring-pry focus:ring-offset-2 transition-all"
                    >
                        {formik.isSubmitting ? "Processing..." : "Submit Request"}
                    </button>
                  </div>
              </form>
              )
            }
        </div>

    )

}

export default ServiceAccountWithdrawal