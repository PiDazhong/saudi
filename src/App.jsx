import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UploadGuard from './pages/UploadGuard';
import './App.less';

function App() {
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
          </div>
        }
      />
      <Route path="/upload" element={<UploadGuard />} />
    </Routes>
  );
}

export default App;
