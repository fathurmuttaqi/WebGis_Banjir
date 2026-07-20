import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/login.css";


function Login() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = async (e) => {

    e.preventDefault();


    if (!email || !password) {

      alert("Email dan password wajib diisi.");
      return;

    }



    try {


      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );



      console.log(
        "LOGIN RESPONSE:",
        response.data
      );



      if(response.data.success){



        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );



        if(response.data.token){

          localStorage.setItem(
            "token",
            response.data.token
          );

        }



        // redirect dashboard

        navigate(
          "/dashboard",
          {
            replace:true
          }
        );



      }else{


        alert(
          response.data.message ||
          "Email atau password salah"
        );


      }



    }catch(error){



      console.error(
        "LOGIN ERROR:",
        error
      );



      alert(

        error.response?.data?.message ||

        "Login gagal, server tidak dapat diakses."

      );


    }


  };




  return (


    <div className="login-container">


      <div className="login-card">


        <h2>
          Login WebGIS
        </h2>



        <form onSubmit={handleLogin}>


          <input

            type="email"

            placeholder="Masukkan Email"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
            }

          />



          <div className="password-group">


            <input

              type={
                showPassword
                ? "text"
                : "password"
              }


              placeholder="Masukkan Password"


              value={password}


              onChange={(e)=>
                setPassword(e.target.value)
              }


            />



            <button

              type="button"

              className="eye-btn"

              onClick={()=>
                setShowPassword(
                  !showPassword
                )
              }

            >


              {
                showPassword

                ?

                <FiEyeOff/>

                :

                <FiEye/>

              }


            </button>


          </div>





          <button

            type="submit"

            className="login-btn"

          >

            Login

          </button>



        </form>





        <p className="login-link">


          Belum punya akun?


          <Link to="/register">

            {" "}Daftar

          </Link>


        </p>



      </div>


    </div>


  );


}


export default Login;