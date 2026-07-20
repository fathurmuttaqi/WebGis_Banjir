import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MainLayout from "./layouts/MainLayout";


function App() {

  const isLogin = !!localStorage.getItem("user");


  return (

    <BrowserRouter>

      <Routes>


        {/* PUBLIC PAGE */}

        <Route 
          path="/login" 
          element={<Login />} 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />



        {/* PRIVATE PAGE */}

        <Route

          element={
            isLogin 
            ? <MainLayout /> 
            : <Navigate to="/login" replace />
          }

        >


          {/* Dashboard */}

          <Route 
            path="/" 
            element={<Dashboard />} 
          />


          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />



          {/* Map */}

          <Route 
            path="/map" 
            element={<Map />} 
          />



          {/* Report */}

          <Route 
            path="/report" 
            element={<Report />} 
          />



          {/* Settings */}

          <Route 
            path="/settings" 
            element={<Settings />} 
          />


        </Route>



        {/* Jika URL tidak ditemukan */}

        <Route

          path="*"

          element={
            <Navigate 
              to="/" 
              replace 
            />
          }

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;