import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
 import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AxiosInstance } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import toast from 'react-hot-toast';




const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name cannot exceed 30 characters')
    .required('First name is required'),


    last_name: yup
  .string()
  .min(2, 'Last name must be at least 2 characters')
  .max(30, 'Last name cannot exceed 30 characters')
  .required('lastName is required'),

    email: yup
  .string()
  .email('Invalid email format')
  .max(30 , 'email cannot exceed 30 characters')
  .required('email is required'),

    password: yup
  .string()
  .min(6, 'password must be at least 6 characters')
  .max(20, 'password cannot exceed 20 characters')
  .required('password is required'),
  

  profile_pic: yup
    .mixed()
    .required('Image is required')
    // .test('fileExist', 'Please select an image', (value) => value && value.length > 0)
    // .test('fileType', 'Unsupported file format', (value) =>
    //   value && value.length > 0
    //     ? ['image/jpeg', 'image/jpg', 'image/gif'].includes(value[0].type)
    //     : false
    // ),
  

    
})





export default function Register() {

  const [img, setImg] = useState();
  
  const navigate = useNavigate()


   const {
  register,
  handleSubmit,
  setValue,
  clearErrors,
  formState: {isSubmitting, errors },
} = useForm({
  resolver: yupResolver(schema),
});



  const handleChange = (e)=>{
    // const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
      
       const file = e.target.files[0];
    
       if ( file && file.type.startsWith('image/')  ) {
         setImg(file);
         setValue("profile_pic", file)
         clearErrors("profile_pic", file)


       } else {
         alert("please upload your img file");
       }
  }






//sending data to backend to register

  const onSubmit = async (data)=>{
   
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", img);
    console.log(formData, "formdata");
 
     try {
        const response = await AxiosInstance.post(endPoints.auth.signup, formData)
     console.log(response.data.message);
     
        if (response.data.status == 200) {
            
           toast.success(response.data.message)
           navigate(`/auth/login`);

        }else{
            toast.error(response.data.message)
        }
        return response;
      
     } catch (error) {
      
        toast.error(error.data.message)
       
     }
     

  }

  
  return (
    <div className="flex min-h-screen items-center justify-center mt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="relative flex flex-col items-center justify-center bg-green-500 text-white p-10 overflow-hidden text-center">
          {/* framer motion animation */}
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

          <p className="relative z-10 text-md">Nice to see you</p>
          <h1 className="text-4xl font-bold relative z-10">Welcome</h1>
          <p className="relative z-10 mt-6 text-xs">
            Join us today and start your journey. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non, commodi nam perspiciatis iste maiores quas ipsa minus asperiores voluptatem fuga, animi error aperiam consequatur beatae placeat? Deleniti, excepturi corrupti.
          </p>
        </div>

        {/* Right Section - Form */}
        <form className="w-full p-10" onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col gap-4 relative">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-green-700">Register</h2>
              <p className="text-sm text-gray-400 mt-2 mb-4">
                Create your account by filling out the information below.
              </p>
            </div>

            <div className=' relative'>
               <span className='absolute w-1 h-10 bg-green-600 left-0 top-0 rounded-sm'></span>

{/* firt name */}
            <input
            {...register('first_name')}
             type="text"
              name="first_name"
               placeholder="FirstName"

                className={` w-full p-2 pl-4 border rounded-md ${
                  errors.first_name ? 'border-red-500' : 'border-gray-300'
                }`}

                   aria-invalid = {errors.first_name ? "true":"false"}

                    autoComplete='firstName'
                />

                {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
                    
                )}



            </div>




                
                <div className=' relative'>
                    
            <span className='absolute w-1 h-10 bg-green-600 left-0 top-0 rounded-sm'></span>


            <input 
            {...register('last_name')}
            type="text"
             name="last_name" 
             placeholder="LastName"
              className={` w-full p-2 pl-4 border rounded-md ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
                aria-invalid={errors.last_name ? "true" : "false"}
                autoComplete='lastName'
              />
                   {errors.last_name && (
                    <p className=' text-red-500 text-sm mt-1'>{errors.last_name.message}</p>
                   )}



                </div>





                 <div className=' relative'>
                     <span className='absolute w-1 h-10 bg-green-600 left-0 top-0  rounded-sm'></span>
            <input 
            {...register('email')}
            type="text"
             name="email" 
             placeholder="email"
              className={` w-full p-2 pl-4 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
                aria-invalid={errors.email ? "true" : "false"}
                autoComplete="email"

              />
                   {errors.email && (
                    <p className=' text-red-500 text-sm mt-1'>{errors.email.message}</p>
                   )}
                </div>
               

               <div className=' relative'>
                                      
            <span className='absolute w-1 h-10 bg-green-600 left-0 top-0 rounded-sm'></span>
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

                
         
              <input
            type="file"
            name="profile_pic"
           className="p-2 border rounded-md"
          accept="image/*"
        onChange={handleChange}
      
      />

      {/* <label htmlFor="upload-button">
        <Button variant="contained" component="span" color="primary">
          Upload Image
        </Button>
      </label> */}


<div>
  {img && (
    <div className="mb-2">
      <img
        src={URL.createObjectURL(img)}
        alt="Preview"
        className="h-44 w-auto rounded-lg shadow-md"
      />
    </div>
  )}

  {errors.profile_pic && (
    <p className="mt-1 text-sm text-red-600">
      {errors.profile_pic.message}
    </p>
  )}
</div>



           

           {isSubmitting ? <button type="submit" className="bg-green-600 p-2 rounded-lg text-white mt-4">Loading...</button> :
           <button type="submit" className="bg-green-600 p-2 rounded-lg text-white mt-4">REGISTER NOW</button>}

            
             {/* <button type="submit" className="bg-green-600 p-2 rounded-lg text-white mt-4"> {isSubmitting ? "Loading..." : "REGISTER NOW" } </button> */}

            <div className="text-center mt-2">
              <Link to="/" className="text-green-700 hover:underline font-medium">
                Already have an account? Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
