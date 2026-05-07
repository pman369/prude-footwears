import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase';
import { Session } from '@supabase/supabase-js';
import './App.css';

// Public Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Portfolio } from './components/Portfolio';
import { OrderTracking } from './components/OrderTracking';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

// Admin Components
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';

const PublicLayout = () => (
  <div className="app">
    <Header />
    <main>
      <Hero />
      <ProductGrid />
      <Portfolio />
      <OrderTracking />
      <About />
    </main>
    <Footer />
    <BackToTop />
  </div>
);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            session ? <AdminDashboard /> : <Login onLogin={() => {}} />
          } 
        />
        
        {/* Redirects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
