import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { AddBook } from './pages/AddBook';
import { EditBook } from './pages/EditBook';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BookList } from './components/BookList';
import React from 'react'
const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/books"
                  element={
                    <PrivateRoute>
                      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                          <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex justify-between items-center mb-8">
                              <div>
                                <h1 className="text-3xl font-bold text-gray-900">Books</h1>
                                <p className="mt-2 text-gray-600">Browse our collection of books</p>
                              </div>
                            </div>
                            <BookList />
                          </div>
                        </div>
                      </div>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/books/add"
                  element={
                    <PrivateRoute>
                      <AddBook />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/books/:id/edit"
                  element={
                    <PrivateRoute>
                      <EditBook />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
