import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FaCircleCheck} from 'react-icons/fa6';
import { MdUploadFile } from 'react-icons/md';
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
					setModalMessage({ success: true, message: 'Deposit request initiated successfully and will be reflected soon!' });
				} else {
					setModalMessage({ success: false, message: response.data.message || 'Deposit request failed. Please try again.' });
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
		<div>
			<div className="bg-pry/20 md:w-1/2 w-full p-5 rounded-lg font-semibold shadow-lg space-y-2">
				<h3>Bank Name: Union Bank</h3>
				<h3>Account Number: 0784386649</h3>
				<h3>Account Name: Pineleaf Estates</h3>
			</div>
			<form
				className="grid items-start md:grid-cols-2 grid-cols-1 md:gap-x-10 gap-y-5 my-5"
				onSubmit={formik.handleSubmit}
			>
				<div className="md:col-span-1 col-span-2 grid gap-3 relative">
					<label htmlFor="amount">Amount to deposit</label>
					<input
						type="number"
						name="amount"
						id="amount"
						className="bg-pry/10 outline-0 border-0 w-full rounded-md h-[60px] indent-3"
						value={formik.values.amount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.amount && formik.errors.amount ? (
						<small className="text-red-500">{formik.errors.amount}</small>
					) : (
						<small className="hidden">
							Amount deposited must match the receipt uploaded to avoid failure
							of transaction.
						</small>
					)}
				</div>
				<div className="md:col-span-1 col-span-2 grid gap-3 relative">
					<label htmlFor="proof_of_payment">Upload Proof of payment</label>
					<input
						type="file"
						name="proof_of_payment"
						id="proof_of_payment"
						className="bg-pry/10 outline-0 border-0 w-full rounded-md h-[60px] indent-3"
						onChange={(event) => {
							const file = event.currentTarget.files?.[0];
							formik.setFieldValue('proof_of_payment', file);
						}}
					/>
					<span className="absolute left-5 top-[56%]">
						<MdUploadFile className="size-6 text-tet" />
					</span>
					{formik.touched.proof_of_payment && formik.errors.proof_of_payment && (
						<small className="text-red-500">{formik.errors.proof_of_payment}</small>
					)}
				</div>
				<div className="col-span-2 text-center mt-5">
					<button
						type="submit"
						disabled={formik.isSubmitting}
						className="bg-pry rounded-lg text-sec font-semibold h-[55px] md:w-1/3 w-3/4"
					>
						{formik.isSubmitting ? 'Submitting...' : 'Complete Deposit'}
					</button>
				</div>
			</form>

			<div
				className={`w-full min-h-full fixed top-0 left-0 bg-pry/80 gap-2 items-center justify-center px-5 ${
					isOpen ? 'flex' : 'hidden'
				}`}
			>
				<div className="alert lg:w-2/6 md:w-2/3 w-full space-y-5 shadow-xl shadow-pry text-center bg-sec rounded-lg p-5">
					{modalMessage.success ? (
						<FaCircleCheck className="size-32 mx-auto text-green-600" />
					) : (
						<FaExclamationTriangle className="size-32 mx-auto text-red-600" />
					)}
					<h3>{modalMessage.message}</h3>
					<small className="">
						For any complaint contact our{' '}
						<a
							href="mailto:pineleafestates@mail.com"
							className="underline underline-offset-2 text-pry"
						>
							support center
						</a>
					</small>
					<div className="flex md:gap-10 gap-6 font-semibold">
						<NavLink to={'/user/transactions'} className={'w-1/2'}>
							<button className="w-full bg-pry/55 shadow-md shadow-tet/20 rounded-lg h-[45px]">
								View History
							</button>
						</NavLink>
						<button
							type="button"
							className="w-1/2 bg-pry text-sec shadow-md shadow-tet/20 rounded-lg h-[45px]"
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
