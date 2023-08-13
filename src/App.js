import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
function App() {
  return (

      <div className="App">
        <BrowserRouter>
          <Header/>
          <PageRoutes />
          <Layout />
          <Footer/>
        </BrowserRouter>
      </div>
      
   

  

  );
}

export default App;
