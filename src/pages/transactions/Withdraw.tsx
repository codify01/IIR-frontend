import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { FaTriangleExclamation } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiURL = import.meta.env.VITE_API_URL;

const Withdraw: React.FC = () => {
	const [user, setUser] = useState<any>({});
	const [isFocused, setIsFocused] = useState<boolean>(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				let config = {
					method: 'get',
					maxBodyLength: Infinity,
					url: `${apiURL}/user.php`,
					headers: {
						Authorization: localStorage.getItem('token') || '',
					},
				};
				const response = await axios.request(config);
				setUser(response.data);
			} catch (error: any) {
				toast.error('Failed to fetch user details');
			}
		};
		fetchUser();
	}, []);

	const balance = user?.total_deposit || 0;

	const handlePercentCut = (percent: number, balance: number) => {
		let calculatedAmount = (percent / 100) * balance;
		formik.setFieldValue('amount', Number(calculatedAmount.toFixed(2))); // Update Formik's state
	};

	const formik = useFormik({
		initialValues: {
			amount: 0,
			accountNumber: '',
			accountName: '',
			bankName: '',
		},
		validationSchema: Yup.object({
			amount: Yup.number()
				.required('Amount is required')
				.min(1, 'Amount must be greater than 0'),
			accountNumber: Yup.string().required('Account Number is required'),
			accountName: Yup.string().required('Account Name is required'),
			bankName: Yup.string().required('Bank Name is required'),
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			// const toastId = toast.loading('Processing withdrawal...');
			try {
				let config = {
					method: 'post',
					maxBodyLength: Infinity,
					url: `${apiURL}/postWithdrawal.php`,
					data: values,
					headers: {
						Authorization: localStorage.getItem('token') || '',
						'Content-Type': 'application/json',
					},
				};
				const response = await axios.request(config);
				console.log(response);
				
				toast.success('Withdrawal request submitted successfully!');
				resetForm();
			} catch (error: any) {
				// toast.dismiss(toastId);
				toast.error(
					error.response?.data?.message ||
						'An error occurred while processing your withdrawal.'
				);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const banks = [
		'Select a bank',
		'GTB',
		'Zenith Bank',
		'UBA',
		'First Bank',
		'Access Bank',
		// Add more banks as needed
	];

	return (
		<div>
			<form
				className="grid grid-cols-2 gap-x-6 gap-y-5"
				onSubmit={formik.handleSubmit}
			>
				{/* Amount */}
				<div className="md:col-span-1 col-span-2 grid gap-3">
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						name="amount"
						id="amount"
						placeholder="Enter amount to withdraw"
						className="input1 amount-input"
						value={formik.values.amount}
						onFocus={() => setIsFocused(true)}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.amount && formik.errors.amount && (
						<div className="error text-red-600">{formik.errors.amount}</div>
					)}
					<div
						className={`amount-btns items-center gap-2 ${
							isFocused ? 'flex' : 'hidden'
						}`}
					>
						<button
							type="button"
							className="w-1/4 p-4 border border-pry bg-pry/10 hover:bg-pry hover:text-sec focus:bg-pry focus:text-sec transition-all"
							onClick={() => handlePercentCut(25, balance)}
						>
							25%
						</button>
						<button
							type="button"
							className="w-1/4 p-4 border border-pry bg-pry/10 hover:bg-pry hover:text-sec focus:bg-pry focus:text-sec transition-all"
							onClick={() => handlePercentCut(50, balance)}
						>
							50%
						</button>
						<button
							type="button"
							className="w-1/4 p-4 border border-pry bg-pry/10 hover:bg-pry hover:text-sec focus:bg-pry focus:text-sec transition-all"
							onClick={() => handlePercentCut(75, balance)}
						>
							75%
						</button>
						<button
							type="button"
							className="w-1/4 p-4 border border-pry bg-pry/10 hover:bg-pry hover:text-sec focus:bg-pry focus:text-sec transition-all"
							onClick={() => handlePercentCut(100, balance)}
						>
							MAX
						</button>
					</div>
				</div>

				{/* Account Number */}
				<div className="md:col-span-1 col-span-2 grid gap-3">
					<label htmlFor="accountNumber">Account Number</label>
					<input
						type="number"
						name="accountNumber"
						id="accountNumber"
						placeholder="Enter recepient's account number"
						className="input1"
						value={formik.values.accountNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.accountNumber && formik.errors.accountNumber && (
						<div className="error text-red-600">
							{formik.errors.accountNumber}
						</div>
					)}
				</div>

				{/* Account Name */}
				<div className="md:col-span-1 col-span-2 grid gap-3">
					<label htmlFor="accountName">Account Name</label>
					<input
						type="text"
						name="accountName"
						id="accountName"
						placeholder="Enter recepient's account name"
						className="input1"
						value={formik.values.accountName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.accountName && formik.errors.accountName && (
						<div className="error text-red-600">
							{formik.errors.accountName}
						</div>
					)}
				</div>

				{/* Bank Name */}
				<div className="md:col-span-1 col-span-2 grid gap-3">
					<label htmlFor="bankName">Receipient Bank</label>
					<select
						name="bankName"
						id="bankName"
						className="input1"
						defaultValue={'Select a bank'}
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
						<div className="error text-red-600">{formik.errors.bankName}</div>
					)}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 text-center mt-5">
					<button
						type="submit"
						disabled={formik.isSubmitting}
						className="bg-pry/55 rounded-lg text-tet font-semibold h-[45px] w-1/3"
					>
						{formik.isSubmitting ? 'Processing...' : 'Submit'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Withdraw;
