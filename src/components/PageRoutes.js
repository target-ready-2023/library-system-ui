import { Route, Routes } from "react-router-dom"
import Student from "./Student"
import Home from "./Home"

const PageRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/student" element={<Student />} />
        </Routes>
    )
  }
  export default PageRoutes