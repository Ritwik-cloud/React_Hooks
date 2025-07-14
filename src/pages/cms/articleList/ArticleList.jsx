import React, { useEffect, useState } from 'react';
import { AxiosInstance } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import toast from 'react-hot-toast';
import ArticalCard from '../../../components/articleCard/ArticleCard';
import SweetAlertComponent from '../../../components/sweetAlert/SweetAlertComponent';
import { Link } from 'react-router-dom';

function ArticalList() {
  const [lists, setLists] = useState([]);
  const [id, setId] = useState();
  const [sweetalert, setSweetalert] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleApi = async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.post(endPoints.crud.list);
      setLists(res.data.data || []);
      return res;
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      const res = await AxiosInstance.post(endPoints.crud.remove, formData);
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setSweetalert(false);
        handleApi();
      } else {
        toast.error(res.data.message);
      }
      return res;
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-4">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
               My Articles
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and organize your articles with ease
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center md:justify-end">
              <Link
                to="/cms/articalCreate"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create New Article
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
              <span className="ml-4 text-gray-600 text-lg">Loading articles...</span>
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              {Array.isArray(lists) && lists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {lists.map((list, index) => (
                    <div 
                      key={index || list._id} 
                      className="transform hover:scale-100 transition duration-300"
                    >
                      <ArticalCard
                        title={list.title}
                        description={list.description}
                        image={list.image}
                        date={list.createdAt}
                        onDelete={() => {
                          setId(list._id);
                          setSweetalert(true);
                        }}
                        id={list._id}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-20">
                  <div className="mb-8">
                    <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                      No Articles Found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Get started by creating your first article
                    </p>
                    <Link
                      to="/cms/articalCreate"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition duration-300 shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Your First Article
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Delete Confirmation Alert */}
          {sweetalert && (
            <SweetAlertComponent
              confirm={() => {
                if (id !== undefined) {
                  handleDelete(id);
                } else {
                  console.error("ID is undefined");
                }
              }}
              cancel={() => setSweetalert(false)}
              title={"Are you sure?"}
              subtitle={"You will not be able to recover this article!"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ArticalList;