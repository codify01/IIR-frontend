import React, { useState, useEffect } from "react";
import CardFive from "../../components/card/Cardfive";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

interface InvestmentPlan {
  maximum_amount: number;
  investment_duration: string;
  interest_rate: string;
  tier: string;
  payOutDate: string;
}

const Confirminvestments: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmittingAPI, setIsSubmittingAPI] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [investmentPlan, setInvestmentPlan] = useState<InvestmentPlan | null>(null);

  const balance = 80000;

  const handlePercentCut = (percent: number) => {
    const calculatedAmount = (percent / 100) * balance;
    formik.setFieldValue("amount", calculatedAmount);
  };

  const fetchInvestmentPlan = async () => {
    try {
      const response = await axios.get(`${apiURL}/eachInvestmentPlans.php?investment_id=5`);
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
        .min(50000, "Minimum investment is 50000")
        .max(balance, `Cannot invest more than your balance (${balance})`),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setIsSubmittingAPI(true);
      setApiError(null);
      setApiSuccess(null);

      const userId = localStorage.getItem("ident");
      const transactionId = `txn_${Date.now()}`; // Example of generating a dynamic transaction ID

      const payload = {
        user_id: userId,
        transaction_id: transactionId,
        amount: values.amount,
        transaction_type: "investment",
        investment_duration: investmentPlan?.investment_duration || "0",
        roi: investmentPlan?.interest_rate || "0",
      };

      try {
        const response = await axios.post(`${apiURL}/investment.php`, payload, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        
        setApiSuccess("Investment successful!");
        resetForm();
      } catch (error: any) {
        setApiError(error.response?.data?.message || "An error occurred while processing your investment.");
      } finally {
        setIsSubmittingAPI(false);
        setSubmitting(false);
      }
    },
  });

  const renderPercentageButtons = () => (
    ["25%", "50%", "75%", "MAX"].map((label, index) => {
      const percent = [25, 50, 75, 100][index];
      return (
        <button
          key={label}
          type="button"
          className="w-1/4 p-4 border"
          onClick={() => handlePercentCut(percent)}
        >
          {label}
        </button>
      );
    })
  );

  return (
    <div className="flex md:flex-row-reverse flex-col-reverse md:gap-5 gap-10">
      <div className="md:w-1/2 w-full space-y-5 bg-sec rounded-lg md:px-5">
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div className="grid gap-3">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount to invest"
              className="input1"
              value={formik.values.amount}
              onFocus={() => setIsFocused(true)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {isFocused && (
              <div className="amount-btns flex items-center gap-2">
                {renderPercentageButtons()}
              </div>
            )}
            {formik.touched.amount && formik.errors.amount && (
              <small className="text-red-500">{formik.errors.amount}</small>
            )}
          </div>
          {apiError && <div className="text-red-500 text-center">{apiError}</div>}
          {apiSuccess && <div className="text-green-500 text-center">{apiSuccess}</div>}
          <div className="text-center font-semibold">
            <button
              type="submit"
              className="w-1/2 bg-pry text-sec shadow-md shadow-tet/20 rounded-lg h-[45px]"
              disabled={formik.isSubmitting || isSubmittingAPI}
            >
              {isSubmittingAPI ? "Processing..." : "Invest"}
            </button>
          </div>
        </form>
      </div>

      <div className="md:w-1/2 w-full">
        {investmentPlan ? (
          <CardFive
            amount={investmentPlan.maximum_amount}
            duration={investmentPlan.investment_duration}
            optStyle="hidden"
          />
        ) : (
          <div>Loading Investment Plan...</div>
        )}
      </div>
    </div>
  );
};

export default Confirminvestments;
