import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { artical_img, AxiosInstance } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import { Calendar } from 'lucide-react';

const ArticleDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await AxiosInstance.get(`${endPoints.crud.detail}/${id}`);
        setDetails(res.data.data || {});
      } catch (error) {
        console.log(error);
      }
    };
    handleApi();
  }, [id]);

  return (
    <article className="min-h-screen w-full mt-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 py-10">
      {/* Image */}
      {details.image && (
        <img
          src={artical_img(details.image)}
          alt={details.title || "Article Cover"}
          className="w-full max-w-2xl rounded-2xl shadow-xl object-cover mb-8"
        />
      )}

    {/* Title and Date Row */}
<div className="w-full max-w-2xl flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
  {/* Title on the left */}
  <h1 className="w-full sm:w-auto text-3xl sm:text-4xl font-bold text-left bg-green-500 bg-clip-text text-transparent">
    {details.title || "Article Title"}
  </h1>

  {/* Date on the right */}
  {details.createdAt ? (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 w-full sm:w-auto justify-end sm:justify-end">
      <Calendar className="w-4 h-4" />
      <span>{new Date(details.createdAt).toLocaleDateString()}</span>
    </div>
  ) : <div className="w-full sm:w-auto" />} {/* Keeps spacing consistent if no date */}
</div>

     

      {/* Description */}
      <p className="text-lg text-gray-700 dark:text-gray-300 text-left max-w-2xl">
        {details.description || "Article description goes here."}
      </p>
    </article>
  );
};

export default ArticleDetails;
