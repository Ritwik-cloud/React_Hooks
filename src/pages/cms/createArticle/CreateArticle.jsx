import React, { memo, useState } from 'react';
import { Image, Upload, X, Save } from 'lucide-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AxiosInstance } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import * as yup from "yup";
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  title: yup
    .string()
    .max(200, "title cannot exceed 200 characters")
    .required("title is required"),
  description: yup
    .string()
    .min(3, "description must be at least 3 characters")
    .max(5000, "description cannot exceed 5000 characters")
    .required("description is required"),
    image: yup
        .mixed()
        .required('Image is required')
});

const CreateArticle = () => {
  const [img, setImg] = useState();
  const [featuredImage, setFeaturedImage] = useState(null);
  
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
      setImg(file);
      setFeaturedImage(URL.createObjectURL(file));
      setValue("image", file);
      clearErrors("image");
    } else {
      alert("please upload your img file");
    }
  };

  const handleImageUpload = (e) => {
    handleChange(e);
  };

  const removeFeaturedImage = () => {
    setImg(null);
    setFeaturedImage(null);
    setValue("image", null);
    const fileInput = document.getElementById("image-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", img);
     
    try {
      const response = await AxiosInstance.post(endPoints.crud.create, formData);
     
      if (response.data.status == 200) {
        toast.success(response.data.message) 
        reset();
        setImg(null);
        setFeaturedImage(null);
      } else {
        toast.error(response.data.message) 
      }
      return response;
    } catch (error) {
      toast.error(error.data.message) 
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Article
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Share your story with the world
              </p>
            </div>
            
            <button
              type='submit'
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Article Title */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Article Title
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="Enter your article title..."
                name='title'
                className={`
                  w-full text-2xl font-bold border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                  ${errors.title ? "border-red-500" : "border-gray-300"}`}
                aria-invalid={errors.title ? "true" : "false"}
              />

              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Article Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Description
              </label>
              <textarea
                {...register("description")}
                name='description'
                placeholder="Write a description of your article..."
                rows={4}
                className={`
                  w-full  outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none
                  ${errors.description ? "border-red-500" : "border-gray-300"}`}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Featured Image Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Featured Image
              </label>
              
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeFeaturedImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 dark:border-gray-600">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                 
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    <span>Choose Image</span>
                  </label>
                </div>
              )}
          
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(CreateArticle);