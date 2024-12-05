import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateInvestments: React.FC = () => {

    const formik = useFormik({
        initialValues : {
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
          }, 5000);
        },    
    })
    
    return (
        
        <div className="">

            <form onSubmit={formik.handleSubmit} className="flex flex-wrap justify-between">

                <div className="md:w-[48%] w-full my-3">
                    <label htmlFor='minInvestment' className="block text-sm font-medium mb-2">Minimum Investement</label>
                    <input
                        type="number"
                        name="minInvestment"
                        id="minInvestment"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="input1"
                        placeholder="Set a minimum investment amount"
                    />
                    {formik.touched.minInvestment && formik.errors.minInvestment && (
                        <div className="text-red-500 text-sm">{formik.errors.minInvestment}</div>
                    )}
                </div>

                <div className="md:w-[48%] w-full my-3">
                    <label htmlFor='investmentTier' className="block text-sm font-medium mb-2">Investment Tier</label>
                    <select 
                        name="investmentTier" 
                        id="investmentTier"
                        className='input1'
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
                        <div className="text-red-500 text-sm">{formik.errors.investmentTier}</div>
                    )}
                </div>

                <div className="md:w-[48%] w-full my-3">
                    <label htmlFor='interestRate' className="block text-sm font-medium mb-2">Interest Rate</label>
                    <input
                        type="number"
                        name="interestRate"
                        id="interestRate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="input1"
                        placeholder="Input interest rate on investment"
                    />
                    {formik.touched.interestRate && formik.errors.interestRate && (
                        <div className="text-red-500 text-sm">{formik.errors.interestRate}</div>
                    )}
                </div>

                <div className="md:w-[48%] w-full my-3">
                    <label htmlFor='duration' className="block text-sm font-medium mb-2">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        id="duration"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="input1"
                        placeholder="Product price"
                        step="0.01"
                    />
                    {formik.touched.duration && formik.errors.duration && (
                        <div className="text-red-500 text-sm">{formik.errors.duration}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="md:w-1/3 w-3/4 mx-auto bg-pry rounded-lg mt-10 text-sec p-4 font-semibold"
                >
                    {formik.isSubmitting ? "Creating Investment..." : "Create Investment"}
                </button>

            </form>

        </div>

    )

}

export default CreateInvestments