import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit2, Trash2, Eye } from 'lucide-react';
import { artical_img } from '../../api/axios/axios';

export default function ArticleCard({ id, onDelete, image, title, description, date }) {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={artical_img(image)} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
    <div className="p-6 space-y-4 group">
  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 dark:group-hover:text-green-400 line-clamp-2 transition-colors">
    {title}
  </h3>
  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
  
  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
      <Calendar className="w-4 h-4" />
      <span>{new Date(date).toLocaleDateString()}</span>
    </div>
  </div>
  
  <div className="flex items-center justify-between pt-4">
    <Link
      to={`/cms/articalDetails/${id}`}
      className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
    >
      <Eye className="w-4 h-4" />
      <span>Read More</span>
    </Link>
    <div className="flex items-center space-x-2">
      <Link 
        // onClick={() => onEdit(id)} 
        to={`/cms/edit/${id}`}
        className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      >
        <Edit2 className="w-4 h-4" />
      </Link>
      <button
        onClick={() => onDelete(id)}
        
        className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
</div>
    </article>
  );
}
