import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navone from '../../components/nav/Navone';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiURL: string = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
	const [isVisible, setVisibility] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Invalid email address')
				.required('Email is required'),
			password: Yup.string()
				.required('Password is required')
				.min(8, 'Password must be at least 8 characters'),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const response = await axios.post(`${apiURL}/login.php`, values);
				const token = response.data.token;
				localStorage.setItem('token', token);
				localStorage.setItem('role', response.data.user.role)
				localStorage.setItem('ident', response.data.user.id)
				toast.success('Login successful!', {
					icon: '🎉',
				});
				if(response.data.user.role === 'investor'){
					navigate('/user/dashboard')
				} else if(response.data.user.role === 'admin'){
					navigate('/admin/dashboard')
				}
			} catch (error: any) {
				toast.error(
					error.response?.data?.message || 'Login failed. Please try again.'
				);
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<div className="h-[100vh] flex items-center justify-center bg-[#e3f9ed]/20 relative">
			<div className="container h-ful px-5">
				<Navone />
				<div className="md:gap-0 gap-5 md:pb-0 pb-10 h-5/6 flex lg:flex-row flex-col-reverse justify-center items-center">
					<div className="lg:w-1/2 md:w-2/3 w-full">
						<h3 className="text-2xl text-center my-5 font-bold">Log In</h3>
						<form
							className="flex flex-col gap-4"
							onSubmit={formik.handleSubmit}
						>
							<div className="grid gap-3">
								<label htmlFor="email">Email Address</label>
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

							<div className="grid gap-3">
								<label htmlFor="password">Password</label>
								<div className="bg-[#2F53181A] rounded-lg gap-2 h-[45px] w-full flex items-center pe-3">
									<input
										type={isVisible ? 'text' : 'password'}
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
											isVisible ? 'hidden' : 'block'
										}`}
										onClick={() => setVisibility(true)}
									/>
									<FaEyeSlash
										className={`cursor-pointer ${
											isVisible ? 'block' : 'hidden'
										}`}
										onClick={() => setVisibility(false)}
									/>
								</div>
								{formik.touched.password && formik.errors.password && (
									<p className="text-red-500 text-sm">{formik.errors.password}</p>
								)}
							</div>

							<button
								type="submit"
								disabled={loading}
								className={`bg-pry text-sec font-semibold h-[45px] mt-[10%] rounded-lg flex items-center justify-center ${
									loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pry/50'
								}`}
							>
								{loading ? (
									<div className="flex items-center gap-2">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span>Logging in...</span>
									</div>
								) : (
									'Log In'
								)}
							</button>
						</form>

						<div className="flex gap-5 text-[#2F5318] my-5 items-center">
							<hr className="w-full border border-[#2F5318]" />
							<span>OR</span>
							<hr className="w-full border border-[#2F5318]" />
						</div>

						<p className="text-[#2F5318] text-center text-base font-semibold">
							Don’t have an account?{' '}
							<NavLink to={'/register'} className={'text-red-600'}>
								Sign Up
							</NavLink>
						</p>
					</div>
					{/* <div className="img md:w-1/2 w-full lg:translate-x-[10%] lg:block hidden">
						<CarouselOne />
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Login;
