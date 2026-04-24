import React from 'react';
import Header from './components/Header';
import Part1Hero from './components/Part1_Hero';
import Part2Trust from './components/Part2_Trust';
import Part3Services from './components/Part3_Services';
import Part4Products from './components/Part4_Products';
import Part5ContactForm from './components/Part5_ContactForm';
import Footer from './components/Footer';
import './App.less';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Part1Hero />
        <Part2Trust />
        <Part3Services />
        <Part4Products />
        <Part5ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
