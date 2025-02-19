"use client"; // Ensures this runs on the client side

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter(); 
  const { register, loading } = useAuth(); 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
          })}
          onSubmit={async(values) => {
            console.log("Form Values:", values);
            await register(values); 
            // router.push("/login");

          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700">Name</label>
                <Field type="text" name="name" className="w-full p-2 border rounded mt-1" />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700">Email</label>
                <Field type="email" name="email" className="w-full p-2 border rounded mt-1" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700">Password</label>
                <Field type="password" name="password" className="w-full p-2 border rounded mt-1" />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
