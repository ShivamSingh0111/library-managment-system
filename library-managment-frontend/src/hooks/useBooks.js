import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookApi } from '../services/api';
import { toast } from 'react-hot-toast';

export const useBooks = () => {
  const queryClient = useQueryClient();

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await bookApi.getAll();
      console.log(response.data);
      return response.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: bookApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book added successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add book');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => bookApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update book');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: bookApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    },
  });

  return {
    books,
    isLoading,
    error,
    createBook: createMutation.mutate,
    updateBook: updateMutation.mutate,
    deleteBook: deleteMutation.mutate,
  };
};
