import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
// import { MdUploadFile } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

const ManualDeposit: React.FC = () => {
  const [isOpen, setIsOpened] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<{ success: boolean; message: string }>({
    success: false,
    message: '',
  });

  const authToken = localStorage.getItem('token');

  const formik = useFormik({
    initialValues: {
      amount: '',
      proof_of_payment: null,
    },
    validationSchema: Yup.object({
      amount: Yup.string().required('Amount is required'),
      proof_of_payment: Yup.mixed().required('Proof of payment is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append('amount', values.amount);
      if (values.proof_of_payment) {
        formData.append('proof_of_payment', values.proof_of_payment);
      }

      setSubmitting(true);

      try {
        const response = await axios.post(`${apiURL}/postDeposit.php`, formData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);

        if (response.data.success) {
          resetForm();
          setModalMessage({
            success: true,
            message: 'Deposit request initiated successfully and will be reflected soon!',
          });
        } else {
          setModalMessage({
            success: false,
            message: response.data.message || 'Deposit request failed. Please try again.',
          });
        }
      } catch (error: any) {
        console.error('Error submitting form:', error.response?.data || error.message);
        setModalMessage({
          success: false,
          message: 'An error occurred while submitting the deposit request. Please try again.',
        });
      } finally {
        setSubmitting(false);
        setIsOpened(true);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
      {/* Bank details section */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Bank Details</h3>
        <div className="space-y-1">
          <p className="text-gray-600">Bank Name: <span className="font-medium">Union Bank</span></p>
          <p className="text-gray-600">Account Number: <span className="font-medium">0784386649</span></p>
          <p className="text-gray-600">Account Name: <span className="font-medium">Pineleaf Estates</span></p>
        </div>
      </div>

      {/* Form Section */}
      <form
        className="grid gap-6 lg:grid-cols-2 md:grid-cols-1"
        onSubmit={formik.handleSubmit}
      >
        {/* Amount to Deposit */}
        <div className="relative">
          <label htmlFor="amount" className="block text-gray-700 font-semibold">Amount to Deposit</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pry focus:outline-none"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <small className="text-red-500">{formik.errors.amount}</small>
          )}
        </div>

        {/* Upload Proof of Payment */}
        <div className="relative w-full">
  <label 
    htmlFor="proof_of_payment" 
    className="block text-gray-700 font-semibold text-sm mb-2">
    Upload Proof of Payment
  </label>
  <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-pry focus-within:outline-none">
    {/* <span className="p-3 bg-gray-100 rounded-l-md flex items-center justify-center">
      <MdUploadFile className="text-gray-600 text-2xl" />
    </span> */}
    <input
      type="file"
      name="proof_of_payment"
      id="proof_of_payment"
      className="w-full p-3 text-gray-600 rounded-r-md focus:outline-none"
      onChange={(event) => {
        const file = event.currentTarget.files?.[0];
        formik.setFieldValue('proof_of_payment', file);
      }}
    />
  </div>
  {formik.touched.proof_of_payment && formik.errors.proof_of_payment && (
    <small className="text-red-500 mt-1 block">{formik.errors.proof_of_payment}</small>
  )}
</div>


        {/* Submit Button */}
        <div className="lg:col-span-2 text-center mt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-pry text-white font-semibold py-3 rounded-lg shadow-md hover:bg-pry-dark transition-colors duration-300"
          >
            {formik.isSubmitting ? 'Submitting...' : 'Complete Deposit'}
          </button>
        </div>
      </form>

      {/* Modal for Success/Error */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6 text-center w-full max-w-md">
          {modalMessage.success ? (
            <FaCircleCheck className="text-green-500 text-6xl mx-auto" />
          ) : (
            <FaExclamationTriangle className="text-red-500 text-6xl mx-auto" />
          )}
          <h3 className="text-lg font-semibold text-gray-800">{modalMessage.message}</h3>
          <small>
            For any complaint, contact our{' '}
            <a
              href="mailto:pineleafestates@mail.com"
              className="underline text-pry"
            >
              support center
            </a>
          </small>
          <div className="flex gap-6 font-semibold mt-4">
            <NavLink to="/user/transactions" className="w-1/2">
              <button className="w-full bg-pry-light text-white py-2 rounded-lg shadow-md hover:bg-pry-dark">
                View History
              </button>
            </NavLink>
            <button
              type="button"
              className="w-1/2 bg-pry text-white py-2 rounded-lg shadow-md hover:bg-pry-dark"
              onClick={() => setIsOpened(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualDeposit;
