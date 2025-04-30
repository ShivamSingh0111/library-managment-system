import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../services/api';
import { toast } from 'react-hot-toast';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await userApi.getAll();
        return response.data || [];
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: userApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User added successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add user');
    },
  });

  const borrowMutation = useMutation({
    mutationFn: ({ userId, bookId }) => userApi.borrowBook(userId, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'users']);
      toast.success('Book borrowed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to borrow book');
    },
  });

  const returnMutation = useMutation({
    mutationFn: ({ userId, bookId }) => userApi.returnBook(userId, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(['books', 'users']);
      toast.success('Book returned successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to return book');
    },
  });

  return {
    users,
    isLoading,
    error,
    createUser: createMutation.mutate,
    borrowBook: borrowMutation.mutate,
    returnBook: returnMutation.mutate,
  };
};
