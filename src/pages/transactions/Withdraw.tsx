import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
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
        console.log(user);
        
      } catch (error: any) {
        toast.error("Failed to fetch user details");
      }
    };
    fetchUser();
  }, []);

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
    "Select a bank", "ABN AMRO", "Absa Group", "Agricultural Bank of China", "ANZ Banking Group", 
    "Axis Bank", "Banco Bradesco", "Banco de la Nación Argentina", 
    "Banco do Brasil", "Banco Santander", "Banco Santander Río", "Banamex", 
    "Bank of America", "Bank of China", "Bank of East Asia", "Bank of Montreal", 
    "Barclays", "BBVA", "BBVA Bancomer", "Booster Bank", "BNP Paribas", "CIBC", "China Construction Bank", 
    "CIMB Group", "Citigroup", "Commerzbank", "Commonwealth Bank", "Credit Suisse", 
    "Crédit Agricole", "Danske Bank", "DBS Bank", "Deutsche Bank", "Ecobank", 
    "FirstRand", "Guaranty Trust Bank", "Hang Seng Bank", "HDFC Bank", "HSBC", 
    "ICICI Bank", "ING Group", "Intesa Sanpaolo", "Itaú Unibanco", 
    "JPMorgan Chase", "Kiwibank", "Lloyds Banking Group", "Malayan Banking Berhad (Maybank)", 
    "Mitsubishi UFJ Financial Group", "Mizuho Financial Group", "National Australia Bank", 
    "National Bank of Canada", "Nedbank", "Nordea", "OCBC Bank", "Public Bank Berhad", 
    "Royal Bank of Canada", "Royal Bank of Scotland", "Santander Brasil", 
    "Scotiabank", "SEB", "Société Générale", "Standard Bank", "Standard Chartered", 
    "State Bank of India", "Sumitomo Mitsui Financial Group", "SBI Holdings", 
    "Toronto-Dominion Bank", "UBS", "UniCredit", "United Overseas Bank", 
    "Wells Fargo", "Westpac", "Zenith Bank",
    "Bank of New York Mellon", "Goldman Sachs", "Morgan Stanley", "Capital One", "American Express", "PNC Financial Services", "U.S. Bancorp", "SunTrust Banks", "Fifth Third Bank",
    "Regions Financial Corporation", "KeyCorp", "M&T Bank", "Huntington Bancshares", "BB&T", "Ally Financial", "Santander Bank", "BMO Harris Bank", "Union Bank", "First Republic Bank",
    "Bank of the West", "Citizens Financial Group", "Comerica", "New York Community Bancorp", "Zions Bancorporation", "People's United Financial", "Synovus Financial", "First Hawaiian Bank", "East West Bank", "Cullen/Frost Bankers",
    "City National Bank", "BankUnited", "Associated Banc-Corp", "Valley National Bank", "First Interstate BancSystem", "Western Alliance Bank", "Old National Bank", "Webster Bank", "Umpqua Bank", "Fulton Financial Corporation",
    "PacWest Bancorp", "Washington Federal", "Columbia Bank", "Texas Capital Bank", "Home BancShares", "Hancock Whitney Bank", "South State Bank", "Great Western Bank",
    "BancorpSouth Bank", "Atlantic Union Bank", "Pinnacle Financial Partners", "Arvest Bank", "First Citizens Bank", "Bank OZK", "First Financial Bank", "Prosperity Bank", "First National Bank of Omaha", "Cadence Bank",
    "Heartland Financial USA", "Trustmark National Bank", "UMB Bank", "FNB Corporation", "Simmons Bank", "TowneBank", "NBT Bank", "First Bank", "Glacier Bancorp", "First Community Bank",
    "Horizon Bank", "Tri Counties Bank", "Old Point National Bank", "Sterling National Bank", "Bank of Marin", "Peoples Bank", "First Merchants Bank", "Peoples State Bank", "PlainsCapital Bank",
    "Texas Bank and Trust", "United Community Bank", "Centier Bank", "Investors Bank", "S&T Bank", "ServisFirst Bank", "Citywide Banks", "Bank of Hawaii", "Bank of Springfield",
    "FirstBank Holding Co.", "Pacific Premier Bank", "Renasant Bank", "Bankers Trust", "MidFirst Bank", "Haverhill Bank", "TIAA Bank", "Sandy Spring Bank", "Chemical Bank", "Flagstar Bank",
    "Nicolet National Bank", "Pinnacle Bank", "MidWestOne Bank", "First National Bank and Trust", "Independent Bank", "Mechanics Bank", "Inland Bank and Trust", "Third Federal Savings and Loan", "Androscoggin Bank", "First Mid Bank & Trust",
    "First National Bank Alaska", "Farmers & Merchants Bank", "First National Bank in Sioux Falls", "Pioneer Bank", "American National Bank", "Southwest Bank", "Peoples Bank of Alabama", "Peoples National Bank", "Great Southern Bank",
    "City Bank", "Summit Bank", "Colony Bank", "Seacoast Bank", "First Southern Bank", "First State Bank", "Guaranty Bank", "American State Bank", "Bank of Commerce", "American Heritage Bank",
    "Central Bank", "Stock Yards Bank & Trust", "BankFirst", "First Mid-Illinois Bank & Trust", "Republic Bank", "Bridgewater Bank", "Third Coast Bank", "American Bank of Commerce", "First Choice Bank", "Farmers State Bank",
    "First Liberty National Bank", "First Savings Bank", "MainSource Bank", "Centennial Bank", "City National Bank of Florida", "First International Bank & Trust", "First Financial Bankshares",
    "First United Bank", "First Western Trust Bank", "HomeStreet Bank", "Independent Bank Group", "Lakeland Bank", "LegacyTexas Bank", "Merchants Bank", "MidWestOne Financial Group", "Pacific Continental Bank",
    "Peoples Security Bank & Trust", "Southside Bank", "Southern First Bank", "Summit State Bank", "Triumph Bank", "United Bank", "United National Bank",
    "University Federal Credit Union", "Westamerica Bank", "Western State Bank", "Wilson Bank & Trust", "Wings Financial Credit Union", "Woodforest National Bank", "ZB, National Association", "Zions First National Bank", "1st Source Bank", "Alerus Financial",
    "Altabank", "American First National Bank", "Ameris Bank", "Bank of Ann Arbor", "Bank of Clarke County", "Bank of George", "Bank of Idaho", "Bank of Labor", "Bank of Missouri", "Bank of San Francisco", 
    "Bank of Stockton", "BankPlus", "Bremer Bank", "Bridge Bank", "Byline Bank", "California Bank & Trust", "Cambridge Trust Company", "Camden National Bank", "Capital City Bank", "Capitol Federal Savings Bank", 
    "Cardinal Bank", "Carter Bank & Trust", "Cathay Bank", "Central Bank of Boone County", "Central Bank of the Midwest", "Central Pacific Bank", "CIBC Bank USA", "City National Bank of West Virginia", 
    "Community Bank", "Community Bank, N.A.", "Community First Bank", "Community Trust Bank", "ConnectOne Bank", "Consumers Credit Union", "Crestmark Bank", "Dacotah Bank", "Dollar Bank", "Eastern Bank", 
    "Enterprise Bank & Trust", "ESL Federal Credit Union", "Evolve Bank & Trust", "Farm Bureau Bank", "Fidelity Bank", "Financial Federal Bank", "First American Bank", "First Bank Financial Centre", 
    "First Citizens Community Bank", "First Commonwealth Bank", "First Federal Bank", "First Midwest Bank", "First Republic Bank", "First Security Bank", "Frost Bank", "Fulton Bank", "Gateway First Bank", 
    "Great Western Bank", "Hanmi Bank", "Hawaii National Bank", "Heartland Bank and Trust Company", "Heritage Bank", "HSBC Bank USA", "Huntington National Bank", "IberiaBank", "International Bank of Commerce", 
    "Intrust Bank", "John Marshall Bank", "KeyBank", "Lake City Bank", "Liberty Bank", "Luther Burbank Savings", "Macatawa Bank", "Mercantile Bank of Michigan", "Midland States Bank", "New York Community Bank", 
    "Northwest Bank", "OneWest Bank", "Origin Bank", "Peoples United Bank", "Popular Bank", "Rabo AgriFinance", "Raymond James Bank", "River City Bank", "Rockland Trust", "State Bank of Cross Plains", 
    "Sterling Bank & Trust", "Sunflower Bank", "Tri Counties Bank", "TriState Capital Bank", "Union Bank", "Unity Bank", "Veritex Community Bank", "Wintrust Bank"
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="error text-red-600 mt-1 text-sm">
              {formik.errors.amount}
            </div>
          )}
          <div className="mt-1">
            Available balance: {user?.balance}
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
