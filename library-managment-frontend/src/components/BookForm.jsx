import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import { bookApi } from '../services/api';
import { validateBook } from '../lib/validation';

export const BookForm = ({ book, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    publishedDate: book?.publishedDate || '',
    genre: book?.genre || '',
    copiesAvailable: book?.copiesAvailable || 1,
  });

  const [errors, setErrors] = useState({});

  const mutation = useMutation({
    mutationFn: (data) => {
      const dataToSend = {
        ...data,
        ISBN: data.isbn,
      };
      delete dataToSend.isbn;
      return book ? bookApi.update(book._id, dataToSend) : bookApi.create(dataToSend);
    },
    onSuccess: () => {
      toast.success(`Book ${book ? 'updated' : 'added'} successfully`);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || `Failed to ${book ? 'update' : 'add'} book`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBook({ ...formData, ISBN: formData.isbn });
    if (validationErrors.errors?.length > 0) {
      const formatted = {};
      validationErrors.errors.forEach((err) => (formatted[err.field] = err.message));
      setErrors(formatted);
      return;
    }
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {book ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['title', 'author', 'isbn', 'publishedDate', 'genre', 'copiesAvailable'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                {field === 'isbn' ? 'ISBN' : field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'publishedDate' ? 'date' : field === 'copiesAvailable' ? 'number' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors[field] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={field === 'isbn' ? 'Enter ISBN (10 or 13 digits)' : `Enter ${field}`}
              />
              {errors[field] && (
                <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              {mutation.isLoading ? 'Saving...' : book ? 'Update' : 'Add'} Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
