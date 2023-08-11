import { Route, Routes } from "react-router-dom"
import User from "./User"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import Category from "./Category"
import { UserIdContext,LandingPage } from "./LandingPage"

const PageRoutes = () => {
    return (
      <LandingPage>
      
        <Routes>
          
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/category" element={<Category />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </LandingPage>
    
    )
  }
  export default PageRoutes