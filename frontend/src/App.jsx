import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";

import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MainLayout from "./layouts/MainLayout";


function App() {


  const [isLogin, setIsLogin] = useState(false);



  // cek login ketika aplikasi dibuka

  useEffect(()=>{


    const user = localStorage.getItem("user");


    if(user){

      setIsLogin(true);

    }


  },[]);





  return (

    <BrowserRouter>


      <Routes>



        {/* PUBLIC */}


        <Route

          path="/login"

          element={

            isLogin

            ?

            <Navigate 
              to="/dashboard"
              replace
            />

            :

            <Login 
              setIsLogin={setIsLogin}
            />

          }

        />




        <Route

          path="/register"

          element={<Register />}

        />







        {/* PRIVATE */}


        <Route


          element={

            isLogin

            ?

            <MainLayout />

            :

            <Navigate 
              to="/login"
              replace
            />

          }


        >




          <Route

            path="/"

            element={<Dashboard />}

          />




          <Route

            path="/dashboard"

            element={<Dashboard />}

          />




          <Route

            path="/map"

            element={<Map />}

          />




          <Route

            path="/report"

            element={<Report />}

          />




          <Route

            path="/settings"

            element={<Settings />}

          />




        </Route>







        {/* HANDLE URL SALAH */}


        <Route


          path="*"


          element={

            <Navigate

              to={
                isLogin
                ?
                "/dashboard"
                :
                "/login"
              }

              replace

            />

          }


        />



      </Routes>


    </BrowserRouter>

  );

}


export default App;