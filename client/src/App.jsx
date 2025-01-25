import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./Pages/404/PageNotFound";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import DashBoard from "./Pages/Dashboard/Dashboard.jsx";
import Footer from ".././src/components/Layout/Footer.jsx";
import Header from ".././src/components/Layout/Header.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  // <PrivateRoute>
                    <DashBoard />
                  // </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>

      {/* <Router>
        <Routes>

          <Route path="dashboard" element={<DashBoard/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
