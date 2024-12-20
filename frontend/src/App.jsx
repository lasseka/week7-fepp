import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import JobPage from "./pages/JobPage"
import EditJobPage from "./pages/EditJobPage";
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

    return (
      <div className="App">
        <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-job" element={isAuthenticated ? <AddJobPage /> : <Navigate to="/signup" />} />
              <Route path="/jobs/:id" element={<JobPage isAuthenticated={isAuthenticated} />} />
              <Route path="/edit-job/:id" element={isAuthenticated ? <EditJobPage /> : <Navigate to="/signup" />} />
              <Route path="/signup" element={isAuthenticated ? (<Navigate to="/" />) : (<Signup setIsAuthenticated={setIsAuthenticated} />)}/>
              <Route path="/login" element={isAuthenticated ? (<Navigate to="/" />) : (<Login setIsAuthenticated={setIsAuthenticated} />)}/>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
