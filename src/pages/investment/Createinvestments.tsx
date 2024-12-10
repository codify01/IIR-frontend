import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateInvestments: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      minInvestment: "",
      investmentTier: "",
      interestRate: "",
      duration: "",
    },
    validationSchema: Yup.object({
      minInvestment: Yup.string().required("Minimum Investment is required!"),
      investmentTier: Yup.string().required("Investment Tier is required!"),
      interestRate: Yup.string().required("Interest Rate is required!"),
      duration: Yup.string().required("Investment duration is required!"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      setSubmitting(true);
      setTimeout(() => {
        resetForm();
        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-pry text-center mb-6">
        Create New Investment
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap justify-between gap-y-6"
      >
        {/* Minimum Investment */}
        <div className="md:w-[48%] w-full">
          <label
            htmlFor="minInvestment"
            className="block text-sm font-medium mb-2"
          >
            Minimum Investment
          </label>
          <input
            type="number"
            name="minInvestment"
            id="minInvestment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            placeholder="Enter minimum amount"
          />
          {formik.touched.minInvestment && formik.errors.minInvestment && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.minInvestment}
            </div>
          )}
        </div>

        {/* Investment Tier */}
        <div className="md:w-[48%] w-full">
          <label
            htmlFor="investmentTier"
            className="block text-sm font-medium mb-2"
          >
            Investment Tier
          </label>
          <select
            name="investmentTier"
            id="investmentTier"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select an investment tier</option>
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
            <option value="Tier 4">Tier 4</option>
          </select>
          {formik.touched.investmentTier && formik.errors.investmentTier && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.investmentTier}
            </div>
          )}
        </div>

        {/* Interest Rate */}
        <div className="md:w-[48%] w-full">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium mb-2"
          >
            Interest Rate (%)
          </label>
          <input
            type="number"
            name="interestRate"
            id="interestRate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            placeholder="Enter interest rate"
          />
          {formik.touched.interestRate && formik.errors.interestRate && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.interestRate}
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="md:w-[48%] w-full">
          <label
            htmlFor="duration"
            className="block text-sm font-medium mb-2"
          >
            Duration (days)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pry focus:outline-none transition-all"
            placeholder="Enter duration in days"
          />
          {formik.touched.duration && formik.errors.duration && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.duration}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-pry text-sec font-semibold px-6 py-3 rounded-md shadow-md hover:bg-pry/90 focus:ring-2 focus:ring-pry focus:ring-offset-2 transition-all"
          >
            {formik.isSubmitting ? "Creating Investment..." : "Create Investment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInvestments;
