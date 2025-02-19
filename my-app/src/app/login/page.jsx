"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
     const { loginUser } = useAuth(); 
  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial Values
  const initialValues = {
    email: "",
    password: "",
  };

  // Handle Submit
  const handleSubmit = async(values) => {
    console.log("Form Values:", values);
    await loginUser(values); 
    // router.push("/login");

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
