import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CarouselOne from '../../components/carousel/Carouselone';
import { NavLink } from 'react-router-dom';
import Navone from '../../components/nav/Navone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiURL: string = import.meta.env.VITE_API_URL;

interface FormValues {
	fullname: string;
	username: string;
	email: string;
	password: string;
	confPassword: string;
	referral_code?: string;
}

const Register: React.FC = () => {
	const [isVisible1, setVisibility1] = useState<boolean>(false);
	const [isVisible2, setVisibility2] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);


	const formik = useFormik<FormValues>({
		initialValues: {
			fullname: '',
			username: '',
			email: '',
			password: '',
			confPassword: '',
			referral_code: '',
		},
		validationSchema: Yup.object({
			fullname: Yup.string()
				.required('Full name is required')
				.min(3, 'Full name must be at least 3 characters'),
			username: Yup.string()
				.required('Username is required')
				.min(3, 'Username must be at least 3 characters'),
			email: Yup.string()
				.email('Invalid email address')
				.required('Email is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'Password must be at least 8 characters'),
			confPassword: Yup.string()
				.oneOf([Yup.ref('password')], 'Passwords must match')
				.required('Confirm password is required'),
			referral_code: Yup.string()
				.optional()
				.matches(/^[A-Za-z0-9]*$/, 'Referral code must be alphanumeric'),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			// const toastId = toast.loading('Registering...');
			try {
				const response = await axios.post(`${apiURL}/signup.php`, values);
				// toast.dismiss(toastId);
				toast.success('Registration successful!', {
					icon: '🎉',
				});
				console.log(response);
				
			} catch (error: any) {
				// toast.dismiss(toastId);
				toast.error(
					error.response?.data?.message || 'Registration failed. Please try again.'
				);
			} finally {
				setLoading(false);
				formik.resetForm();
			}
		}
	})

	return (
		<div className="lg:h-max md:h-[100vh] h-max pb-10 bg-[#e3f9ed]/20 relative">
			<div className="container h-full px-5">
				<Navone />
				<div className="flex items-center text-sm h-5/6 lg:flex-row flex-col-reverse md:justify-center">
					<div className="lg:w-1/2 md:w-3/4 w-full">
						<h3 className="text-2xl text-center my-5 font-bold">Register</h3>
						<form
							className="flex flex-col md:gap-5 lg:gap-3 gap-3"
							onSubmit={formik.handleSubmit}
						>
							{/* Full Name */}
							<div className="grid gap-2">
								<label htmlFor="fullname">Full Name</label>
								<input
									type="text"
									id="fullname"
									name="fullname"
									placeholder="Enter your full name"
									className="input1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.fullname}
								/>
								{formik.touched.fullname && formik.errors.fullname && (
									<p className="text-red-500 text-sm">{formik.errors.fullname}</p>
								)}
							</div>

							{/* Username */}
							<div className="grid gap-2">
								<label htmlFor="username">Username</label>
								<input
									type="text"
									id="username"
									name="username"
									placeholder="Enter your username"
									className="input1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.username}
								/>
								{formik.touched.username && formik.errors.username && (
									<p className="text-red-500 text-sm">{formik.errors.username}</p>
								)}
							</div>

							{/* Email */}
							<div className="grid gap-2">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="@mail.com"
									className="input1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email && (
									<p className="text-red-500 text-sm">{formik.errors.email}</p>
								)}
							</div>

							{/* Password */}
							<div className="grid gap-2">
								<label htmlFor="password">Password</label>
								<div className="bg-[#2F53181A] input1 flex items-center pe-3">
									<input
										type={isVisible1 ? 'text' : 'password'}
										id="password"
										name="password"
										placeholder="Enter password"
										className="placeholder:text-black bg-transparent w-full placeholder:text-sm indent-3 border-none outline-none"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
									/>
									<FaEye
										className={`cursor-pointer ${
											isVisible1 ? 'hidden' : 'block'
										}`}
										onClick={() => setVisibility1(true)}
									/>
									<FaEyeSlash
										className={`cursor-pointer ${
											isVisible1 ? 'block' : 'hidden'
										}`}
										onClick={() => setVisibility1(false)}
									/>
								</div>
								{formik.touched.password && formik.errors.password && (
									<p className="text-red-500 text-sm">{formik.errors.password}</p>
								)}
							</div>

							{/* Confirm Password */}
							<div className="grid gap-2">
								<label htmlFor="confPassword">Confirm Password</label>
								<div className="bg-[#2F53181A] input1 flex items-center pe-3">
									<input
										type={isVisible2 ? 'text' : 'password'}
										id="confPassword"
										name="confPassword"
										placeholder="Re-enter password"
										className="placeholder:text-black bg-transparent w-full placeholder:text-sm indent-3 border-none outline-none"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.confPassword}
									/>
									<FaEye
										className={`cursor-pointer ${
											isVisible2 ? 'hidden' : 'block'
										}`}
										onClick={() => setVisibility2(true)}
									/>
									<FaEyeSlash
										className={`cursor-pointer ${
											isVisible2 ? 'block' : 'hidden'
										}`}
										onClick={() => setVisibility2(false)}
									/>
								</div>
								{formik.touched.confPassword && formik.errors.confPassword && (
									<p className="text-red-500 text-sm">
										{formik.errors.confPassword}
									</p>
								)}
							</div>

							{/* Referral Code */}
							<div className="grid gap-2">
								<label htmlFor="referral_code">Referral Code (optional)</label>
								<input
									type="text"
									id="referral_code"
									name="referral_code"
									placeholder="Enter referral code (if any)"
									className="input1"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.referral_code}
								/>
								{formik.touched.referral_code &&
									formik.errors.referral_code && (
										<p className="text-red-500 text-sm">
											{formik.errors.referral_code}
										</p>
									)}
							</div>

							<button
								type="submit"
								disabled={loading}
								className={`bg-pry text-white font-semibold px-4 py-3 rounded-lg flex items-center justify-center ${
									loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pry'
								}`}
							>
								{loading ? (
									<div className="flex items-center gap-2">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span>Registering...</span>
									</div>
								) : (
									'Register'
								)}
							</button>
						</form>
						<div className="flex gap-5 text-[#2F5318] my-5 items-center">
							<hr className="w-full border border-[#2F5318]" />
							<span>OR</span>
							<hr className="w-full border border-[#2F5318]" />
						</div>
						<p className="text-[#2F5318] text-center text-base font-semibold">
							Already have an account?{' '}
							<NavLink to={'/login'} className={'text-red-600'}>
								Log In
							</NavLink>
						</p>
					</div>
					<div className="img md:w-1/2 w-full lg:translate-x-[10%] lg:block hidden">
						<CarouselOne />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
