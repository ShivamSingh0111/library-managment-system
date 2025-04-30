import React from 'react' 
import { Book } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';

export const UserCard = ({ user }) => {
  const { borrowBook, returnBook } = useUsers();

  const handleBorrow = (bookId) => {
    borrowBook({ userId: user._id, bookId });
  };

  const handleReturn = (bookId) => {
    returnBook({ userId: user._id, bookId });
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{user.name}</h3>
      <p className="mb-2 text-sm text-gray-600">Email: {user.email}</p>
      
      <div className="mt-4">
        <h4 className="mb-2 text-sm font-medium text-gray-700">Borrowed Books</h4>
        {user.borrowedBooks?.length > 0 ? (
          <ul className="space-y-2">
            {user.borrowedBooks.map((book) => (
              <li key={book._id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{book.title}</span>
                <button
                  onClick={() => handleReturn(book._id)}
                  className="btn btn-secondary btn-sm"
                  aria-label={`Return ${book.title}`}
                >
                  Return
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No books borrowed</p>
        )}
      </div>
    </div>
  );
};
