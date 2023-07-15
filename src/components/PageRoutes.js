import { Route, Routes } from "react-router-dom"
import Student from "./Student"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import BooksDirectory from "./BooksDirectory"

const PageRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/student" element={<Student />} />
          <Route path='*' element={<NotFound />}/>
          <Route path="/booksDirectory" element={<BooksDirectory />} />
        </Routes>
    )
  }
  export default PageRoutes