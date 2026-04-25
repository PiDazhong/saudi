import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UpOutlined } from '@ant-design/icons';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UploadGuard from './pages/UploadGuard';
import './App.less';

function App() {
  useEffect(() => {
    const img = new Image();
    img.src = 'https://saudi.damons.sa/icons/home/ç­å°2.1.jpg';
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <Header />
            <main>
              <HomePage />
            </main>
            <Footer />
            <button
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <UpOutlined />
            </button>
          </div>
        }
      />
      <Route path="/upload" element={<UploadGuard />} />
    </Routes>
  );
}

export default App;
