import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
function App() {
  return (
    <div>

      <BrowserRouter>
      <Header/>
      <div className="App">
      <PageRoutes />


        <Layout />


      </div>
      <Footer/>
    </BrowserRouter>

    </div>

  );
}

export default App;
