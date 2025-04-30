import React from 'react'
import { useUsers } from '../hooks/useUsers';
import { UserCard } from './UserCard';

export const UserList = () => {
  const { users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};
