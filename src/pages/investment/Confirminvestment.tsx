import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import InvestmentCard from "../../components/card/InvestmentCard";

const apiURL = import.meta.env.VITE_API_URL;

interface InvestmentPlan {
  minimum_amount:number;
  maximum_amount: number;
  investment_duration: string;
  interest_rate: string;
  tier: string;
  payOutDate: string;
}

const Confirminvestments: React.FC = () => {
  const {id} = useParams()
  // const [isFocused, setIsFocused] = useState(false);
  const [isSubmittingAPI, setIsSubmittingAPI] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [investmentPlan, setInvestmentPlan] = useState<InvestmentPlan | null>(null);

  const fetchInvestmentPlan = async () => {
    try {
      const response = await axios.get(`${apiURL}/eachInvestmentPlans.php?investment_id=${id}`);
      setInvestmentPlan(response.data.investment);
    } catch (error) {
      setApiError("Failed to load investment plan.");
    }
  };

  useEffect(() => {
    fetchInvestmentPlan();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Amount is required")
        .min(investmentPlan?.minimum_amount, `You can not invest less than ${investmentPlan?.minimum_amount}`)
        .max(investmentPlan?.maximum_amount, `Cannot invest more than your balance (${investmentPlan?.maximum_amount})`),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setIsSubmittingAPI(true);
      setApiError(null);
      setApiSuccess(null);

      const userId = localStorage.getItem("ident");

      const payload = {
        user_id: userId,
        amount: values.amount,
        investment_id:id
      };

      try {
        const response = await axios.post(`${apiURL}/investment.php`, payload, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setApiSuccess("Investment successful!");
        console.log(response);
        
        resetForm();
      } catch (error: any) {
        setApiError(
          error.response?.data?.message || "An error occurred while processing your investment."
        );
      } finally {
        setIsSubmittingAPI(false);
        setSubmitting(false);
      }
    },
  });

 

  return (
    <div className="flex md:flex-row flex-col md:gap-8 gap-10 p-6">
      {/* Form Section */}
      <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-bold text-pry">Confirm Investment</h2>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount to invest"
              className="w-full border border-pry rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
              value={formik.values.amount}
              onFocus={() => setIsFocused(true)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
         
            {formik.touched.amount && formik.errors.amount && (
              <small className="text-red-500">{formik.errors.amount}</small>
            )}
          </div>
          {apiError && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md text-sm text-center">
              {apiError}
            </div>
          )}
          {apiSuccess && (
            <div className="bg-green-100 text-green-600 p-3 rounded-md text-sm text-center">
              {apiSuccess}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pry text-sec font-semibold py-3 rounded-md shadow-md hover:bg-pry/90 transition-all"
            disabled={formik.isSubmitting || isSubmittingAPI}
          >
            {isSubmittingAPI ? "Processing..." : "Invest"}
          </button>
        </form>
      </div>

      {/* Card Section */}
      <div className="md:w-1/2 w-full">
        {investmentPlan ? (
          <InvestmentCard
            amount={investmentPlan.maximum_amount}
            duration={investmentPlan.investment_duration}
            interestRate={investmentPlan.roi}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Confirminvestments;
