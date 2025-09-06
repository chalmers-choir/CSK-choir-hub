import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="py-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary-600">CSK</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The premier choir management platform for CSK.
          Manage events, track participation, and stay connected with your choir community.
        </p>

        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
              Join CSK
            </Link>
            <Link to="/login" className="btn btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        ) : (
          <div className="bg-primary-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-primary-800 mb-2">
              Welcome back, {user?.first_name || user?.username}!
            </h2>
            <p className="text-primary-700">
              Ready to explore upcoming events and manage your choir activities?
            </p>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Our Choir</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          CSK is a prestigious choir with a rich tradition of musical excellence.
          Our platform helps members stay organized, informed, and connected throughout
          the 2025/2026 season and beyond.
        </p>
      </div>
    </div>
  );
};

export default Home;
