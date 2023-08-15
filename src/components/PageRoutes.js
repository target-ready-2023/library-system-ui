import { Route, Routes } from "react-router-dom"
import User from "./User"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import Category from "./Category"
import { UserIdContext,LandingPage } from "./LandingPage"
import UserContext from './UserContext';
import {useState} from 'react';

const PageRoutes = () => {
  const [userId, setUserId] = useState(null);
    return (
      // <LandingPage>
      <UserContext.Provider value={{ userId, setUserId }}>
        <Routes>
          
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/category" element={<Category />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </UserContext.Provider>
        // </LandingPage>
    
    )
  }
  export default PageRoutes