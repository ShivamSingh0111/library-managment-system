import React from 'react'
import { useState } from 'react';
import { BookList } from '../components/BookList';
import { BookForm } from '../components/BookForm';
import { UserManagement } from '../components/UserManagement';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { books, isLoading, error } = useBooks();
  const { isAdmin, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Library Dashboard</h1>
              <p className="mt-2 text-gray-600">Manage your books and users</p>
              {user && (
                <p className="mt-1 text-sm text-indigo-600">
                  Logged in as: {user.email} ({user.role})
                </p>
              )}
            </div>
            {isAdmin() && (
              <Link
                to="/books/add"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Book
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-indigo-900">Total Books</h2>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{books?.length || 0}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-purple-900">Available Books</h2>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {books?.filter(book => book.copiesAvailable > 0).length || 0}
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-pink-900">Borrowed Books</h2>
              <p className="text-3xl font-bold text-pink-600 mt-2">
                {books?.filter(book => book.copiesAvailable === 0).length || 0}
              </p>
            </div>
          </div>

          {isAdmin() && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
              <UserManagement />
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Books</h2>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="rounded-lg bg-red-50 p-4 text-red-700">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading books</h3>
                    <div className="mt-2 text-sm text-red-700">{error.message}</div>
                  </div>
                </div>
              </div>
            ) : (
              <BookList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
