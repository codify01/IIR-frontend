import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import InvestmentCard from "../../components/card/InvestmentCard";

const apiURL = import.meta.env.VITE_API_URL;

interface InvestmentPlan {
  minimum_amount: number;
  maximum_amount: number;
  investment_duration: string;
  roi: string;
  tier: string;
  payOutDate: string;
  investment_description: string;
}

const Confirminvestments: React.FC = () => {
  const { id } = useParams();
  const [isSubmittingAPI, setIsSubmittingAPI] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [investmentPlan, setInvestmentPlan] = useState<InvestmentPlan | null>(null);

  const fetchInvestmentPlan = async () => {
    try {
      const response = await axios.get(`${apiURL}/eachInvestmentPlans.php?investment_id=${id}`);
      if (response.data.investment) {
        setInvestmentPlan(response.data.investment);
        console.log("investmentPlan", investmentPlan);
        
      } else {
        setApiError("No investment plan found.");
      }
    } catch (error) {
      setApiError("Failed to load investment plan.");
    }
  };

  useEffect(() => {
    fetchInvestmentPlan();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Amount is required")
        .min(
          investmentPlan?.minimum_amount || 0,
          `You can not invest less than ${investmentPlan?.minimum_amount}`
        )
        .max(
          investmentPlan?.maximum_amount || 0,
          `Cannot invest more than the maximum amount (${investmentPlan?.maximum_amount})`
        ),
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
        investment_id: id,
      };

      try {
        const response = await axios.post(`${apiURL}/investment.php`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if(response.data.error){
          setApiError(response.data.error)
        }else{

        setApiSuccess("Investment successful!");
        console.log(response)}

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
    <div className="flex md:flex-row flex-col-reverse md:gap-8 gap-10">
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && formik.errors.amount && (
              <small className="text-red-500">{formik.errors.amount}</small>
            )}
          </div>

          {/* Error and Success Messages */}
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

          {/* Submit Button */}
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
            amount={investmentPlan.minimum_amount}
            duration={investmentPlan.investment_duration}
            interestRate={investmentPlan.roi}
            payOutDate=""
            planDescription={investmentPlan.investment_description}
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
