import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, BookOpen, Book } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { useAuth } from '../context/AuthContext';

export const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { deleteBook } = useBooks();
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(book._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          {isAdmin() && (
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/books/${book._id}/edit`)}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200"
                aria-label="Edit book"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                aria-label="Delete book"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
        <p className="text-sm text-gray-600 mb-1">ISBN: {book.isbn}</p>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Book className="h-4 w-4 mr-1" />
          <span>Quantity: {book.copiesAvailable}</span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Status</span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            book.copiesAvailable > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {book.copiesAvailable > 0 ? 'Available' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};
