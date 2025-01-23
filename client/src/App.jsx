import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/404/PageNotFound";
import Login from "./Pages/Login/login.jsx";
import Register from "./Pages/Register/register.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
