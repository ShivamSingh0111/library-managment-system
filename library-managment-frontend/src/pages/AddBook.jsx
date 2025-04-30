import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BookForm } from '../components/BookForm';
import { ArrowLeft } from 'lucide-react';

export const AddBook = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          </div>
          <BookForm
            onClose={() => navigate('/')}
            onSuccess={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
};
