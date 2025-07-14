import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { artical_img, AxiosInstance } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import { Calendar } from 'lucide-react';

const ArticleDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleApi = async () => {
      try {
        setLoading(true);
        const res = await AxiosInstance.get(`${endPoints.crud.detail}/${id}`);
        setDetails(res.data.data || {});
      } catch (error) {
        console.log(error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };
    handleApi();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full mt-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full mt-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-lg text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <article className="min-h-screen w-full mt-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        {/* Main content wrapper */}
        <div className="max-w-4xl mx-auto">
          
          {/* Article Image */}
          {details.image && (
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <img
                src={artical_img(details.image)}
                alt={details.title || "Article Cover"}
                className="w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
              />
            </div>
          )}

          {/* Title and Date Container */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            {/* Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-6 leading-tight break-words">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {details.title || "Article Title"}
              </span>
            </h1>

            {/* Date */}
            {details.createdAt && (
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium">
                  {new Date(details.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Article Description/Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed md:leading-loose text-gray-700 dark:text-gray-300">
              {details.description ? (
                <div className="whitespace-pre-line break-words overflow-wrap-anywhere hyphens-auto">
                  {details.description}
                </div>
              ) : (
                <div className="italic text-gray-500 dark:text-gray-400">
                  No description available for this article.
                </div>
              )}
            </div>
          </div>

          {/* Additional article metadata (optional) */}
          {(details.author || details.category || details.tags) && (
            <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* Author */}
                {details.author && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">By:</span>
                    <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                      {details.author}
                    </span>
                  </div>
                )}

                {/* Category */}
                {details.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {details.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {details.tags && Array.isArray(details.tags) && details.tags.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2 block">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {details.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleDetails;