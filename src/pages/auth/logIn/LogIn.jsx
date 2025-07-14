import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosInstance } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import toast from 'react-hot-toast';
import { useTokenStore } from '../../../Store/AuthStore';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .max(30, "Email cannot exceed 30 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
});

export default function LogIn() {

  const setToken = useTokenStore((state)=> state.setToken)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // sending data to backend to login

  const handleForm = async (data) => {
   
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await AxiosInstance.post(endPoints.auth.signin, formData);
      console.log(response);
      
      if (response.data.status == 200) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("firstName", response.data.data.first_name)
        localStorage.setItem("ProfilePic", response.data.data.profile_pic)
          toast.success(response.data.message)
          
           navigate(`/`);
           setToken()
      } else {
        toast.error(response.data.message)
      }
        return response;
    } catch (error) {
     
       toast.error(error.data.message)
      
    }
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center  p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="relative flex flex-col items-center justify-center bg-green-500 text-white p-10 overflow-hidden text-center">
          {/* Framer Motion animation */}
          <motion.svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 400"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.2, 0.15],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <circle cx="400" cy="200" r="200" fill="white" />
          </motion.svg>

          <p className="relative z-10 text-md">Nice to see you again</p>
          <h1 className="text-4xl font-bold relative z-10">Welcome Back</h1>
          <p className="relative z-10 mt-6 text-xs">
            Access your account and continue your journey.<br />
            We're glad to see you again!
          </p>
        </div>

        {/* Right Section - Login Form */}
        <form className="w-full p-10" onSubmit={handleSubmit(handleForm)}>
          <div className="flex flex-col gap-4 relative">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-green-700">Log In</h2>
              <p className="text-sm text-gray-400 mt-2 mb-4">
                Enter your credentials to access your account.
              </p>
            </div>

            <div className="relative">
              <span className="absolute w-1 h-10 bg-green-600 left-0 top-0 rounded-sm"></span>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                name='email'
                className={`w-full p-2 pl-4 border rounded-md ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <span className="absolute w-1 h-10 bg-green-600 left-0 top-0 rounded-sm"></span>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                name='password'
                className={`w-full p-2 pl-4 border rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="current-password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button 
              type="submit" 
               disabled = {isSubmitting}
              className="bg-green-600 hover:bg-green-700 transition-colors p-2 rounded-lg text-white mt-4 font-medium"
            >
              {isSubmitting ? "Logging" : "Log In"}
            </button>

            <div className="text-center mt-2">
              <Link 
                to="/auth/register" 
                className="text-green-700 hover:underline font-medium"
              >
                Don't have an account? Register
              </Link> 
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

