import React, { useEffect, useState } from "react";
import {
  IoPersonCircle,
  IoLockClosed,
  IoPencil,
  IoMail,
  IoCall,
  IoDocument
} from "react-icons/io5";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const apiURL = import.meta.env.VITE_API_URL

const ProfilePage: React.FC = () => {
  const [kycDocument, setKycDocument] = useState<File | null>(null);
  const [initialFormData, setInitialFormData] = useState({});

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      const updateData = {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
      };

      // Send updated data to API
      axios
        .put("/api/user/profile", updateData) // Replace with your API endpoint
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          setInitialFormData(updateData);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });

      if (kycDocument) {
        const formData = new FormData();
        formData.append("kycDocument", kycDocument);

        axios
          .post("/api/user/kyc-upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("KYC document uploaded successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error uploading KYC document:", error);
          });
      }
    },
  });

  useEffect(() => {
    // Fetch initial form data from API
    axios
      .get(`${apiURL}/user.php`,{headers: { Authorization: localStorage.getItem("token") || ""}}) // Replace with your API endpoint
      .then((response) => {
        formik.setValues(response.data);
        setInitialFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setKycDocument(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen mt-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pry">Profile</h1>
        <p className="text-lg text-pry/80">Manage your account information and settings.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-sec p-6 rounded-lg border border-pry mb-8">
        <div className="flex items-center">
          <IoPersonCircle className="text-6xl text-pry" />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-pry">{formik.values.fullname}</h2>
            <p className="text-pry/80">{formik.values.email}</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-sec p-6 rounded-lg border border-pry">
        <h2 className="text-xl font-bold text-pry mb-4">Edit Profile</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-pry mb-2">Full Name</label>
            <div className="flex items-center border border-pry/50 rounded-lg bg-transparent p-3">
              <IoPencil className="text-pry mr-2" />
              <input
                type="text"
                name="fullname"
                className="bg-transparent w-full text-pry outline-none"
                placeholder="Enter your full name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="text-red-500 text-sm">{formik.errors.fullname}</div>
            ) : null}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-pry mb-2">Email Address</label>
            <div className="flex items-center border border-pry/50 rounded-lg bg-transparent p-3">
              <IoMail className="text-pry mr-2" />
              <input
                type="email"
                name="email"
                className="bg-transparent w-full text-pry outline-none"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-pry mb-2">Phone Number</label>
            <div className="flex items-center border border-pry/50 rounded-lg bg-transparent p-3">
              <IoCall className="text-pry mr-2" />
              <input
                type="tel"
                name="phone"
                className="bg-transparent w-full text-pry outline-none"
                placeholder="Enter your phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>

          {/* KYC Document Upload */}
          <div>
            <label className="block text-pry mb-2">Upload KYC Document</label>
            <div className="flex items-center border border-pry/50 rounded-lg bg-transparent p-3">
              <IoDocument className="text-pry mr-2" />
              <input
                type="file"
                className="bg-transparent w-full text-pry outline-none"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg ${
              formik.dirty || kycDocument ? "bg-pry text-sec hover:bg-pry/90" : "bg-pry/50 text-sec/50"
            }`}
            disabled={!formik.dirty && !kycDocument}
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-sec p-6 rounded-lg border border-pry mt-8">
        <h2 className="text-xl font-bold text-pry mb-4">Security Settings</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IoLockClosed className="text-2xl text-pry mr-4" />
            <p className="text-pry">Change Password</p>
          </div>
          <button className="bg-pry text-sec px-4 py-2 rounded-lg hover:bg-pry/90">Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
