import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ImUserPlus } from "react-icons/im";
import { MdOutlineClear } from "react-icons/md";

const ManageAdmins: React.FC = () => {

    const location = useLocation();
    const isProfileRoute = location.pathname.includes("/superadmin/manageadmin/");

    const [ createAdmin, setCreateAdmin ] = useState(false)

    const [isVisible1, setVisibility1] = useState(false);

    const formik = useFormik({
        initialValues: {
            uName: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object().shape({
            email: yup.string().email("Invalid email").required("Email is required"),
            uName: yup.string().required("User Name is required"),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log(values);
            setSubmitting(true)
            setTimeout(() => {
                setSubmitting(false)
                resetForm()
            }, 5000);
        },

    })

    const users: {id: number; email: string;}[] = [
        { 
            id: 1,
            email: "admin@mail.com",
        },
        { 
            id: 2,
            email: "admin@mail.com",
        },
        { 
            id: 3,
            email: "admin@mail.com",
        },
        { 
            id: 4,
            email: "admin@mail.com",
        },
        { 
            id: 5,
            email: "admin@mail.com",
        },
        { 
            id: 6,
            email: "admin@mail.com",
        },
        { 
            id: 7,
            email: "admin@mail.com",
        },
        { 
            id: 8,
            email: "admin@mail.com",
        },
    ];

    return (

        <div className='flex lg:flex-row flex-col md:gap-6 gap-14'>
            <div className="thissss relative overflow-x-auto lg:w-1/2 lg:mb-0 mb-10 w-full lg:max-h-[82vh] max-h-[100vh] text-xs bg-pry p-2 text-sec rounded-md shadow-lg shadow-tet/30">
                <table className="whitespace-nowrap w-full text-center">
                    <thead>
                        <tr className='border-b-2 border-sec/20'>
                            <th scope="col" className="py-4">S/N</th>
                            <th scope="col" className="py-4">Email address</th>
                            <th scope="col" className="py-4">
                                <button 
                                    className={`flex gap-3 bg-sec text-pry md:p-4 py-4 p-3 rounded-lg absolute top-2 right-2 shadow-lg shadow-tet/30`}
                                    onClick={() => setCreateAdmin(true)}
                                >
                                    <span><ImUserPlus className="size-4" /></span>
                                    <span>Create New Admin</span>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 
                            ?
                            users.map(({id, email}, index) => (
                                <tr key={id} className='border-b border-sec/20'>
                                    <td className="font-medium">{index + 1}</td>
                                    <td className="font-medium">{email}</td>
                                    <td className="font-medium">
                                        <Link to={`/superadmin/manageadmin/${id}`}>
                                            <button className='bg-sec text-tet p-3 rounded-lg shadow-lg shadow-tet/30'>View Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr className='border-b border-sec/20'>
                                <td colSpan={3} className="font-bold text-2xl py-10">No users found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <div
                className={`lg:w-1/2 lg:sticky w-full h-full fixed top-0 right-0 flex justify-center lg:p-0 md:p-5 p-4 items-center 
                ${isProfileRoute ? "lg:bg-transparent bg-pry/50 z-10" : "bg-transparent -z-10"}`}
            >
                <Outlet/>
            </div>

            <div className={`fixed top-0 z-30 left-0 bg-pry/80 w-full h-full flex items-center justify-center px-5 ${createAdmin ? "block" : "hidden"}`}>
                <form className="relative bg-sec lg:w-1/2 md:w-3/4 w-full p-10 rounded-xl overflow-hidden shadow-lg shadow-tet/30 flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <button 
                        type="button"
                        className="w-14 h-14 flex items-center justify-center size-6 bg-red-700 text-3xl text-sec absolute top-0 right-0 rounded-b shadow-md shadow-tet/20"
                        onClick={() => setCreateAdmin(false)}
                    >
                        <MdOutlineClear />
                    </button>
                    <h3 className="text-center text-3xl font-bold">Create Admin</h3>
                    <div className="grid gap-2">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter an email for admin" 
                            className="input1"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="error text-red-600">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="flex md:flex-row flex-col gap-5">
                        <div className="grid gap-2 md:w-1/2 w-full">
                            <label htmlFor="uName">Username</label>
                            <input 
                                type="text" 
                                id="uName" 
                                name="uName" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter username for admin" 
                                className="input1"
                            />
                            {formik.touched.uName && formik.errors.uName && (
                                <div className="error text-red-600">{formik.errors.uName}</div>
                            )}
                        </div>
                        <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-5">
                            <div className="grid gap-2 w-full">
                                <label htmlFor="password">Password</label>
                                <div className="bg-[#2F53181A] input1 flex items-center pe-3">
                                    <input 
                                        type={isVisible1 ? "text" : "password"} 
                                        id="password" 
                                        name="password" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Set a password for admin" 
                                        className="placeholder:text-black bg-transparent w-full placeholder:text-sm indent-3 border-none outline-none"
                                    />
                                    <FaEye className={`cursor-pointer ${isVisible1 ? "hidden" : "block"}`} onClick={() => setVisibility1(true)}/>
                                    <FaEyeSlash className={`cursor-pointer ${isVisible1 ? "block" : "hidden"}`} onClick={() => setVisibility1(false)}/>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="error text-red-600">{formik.errors.password}</div>
                                )}
                            </div> 
                        </div>
                    </div>
                    <button 
                        className="bg-[#2F5318] text-white font-semibold h-[45px] mt-8 md:w-3/4 w-full shadow-lg shadow-tet/30 mx-auto rounded-lg"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Creating Admin..." : "Create Admin"}
                    </button>
                </form>
            </div>

        </div>


    )

}

export default ManageAdmins