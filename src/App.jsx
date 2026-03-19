import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import User from './pages/User';
import Vendor from './pages/Vendor';
import Admin from './pages/Admin';
import TourDetails from './pages/TourDetails';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-16 font-sans relative">
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/tour/:slug" element={<TourDetails />} />
            <Route path="/vendor" element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </main>

        <Routes>
          {/* Show Footer only on the main User web page for cleanest dashboard experiences */}
          <Route path="/" element={<Footer />} />
          <Route path="/tour/:slug" element={<Footer />} />
        </Routes>

        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
