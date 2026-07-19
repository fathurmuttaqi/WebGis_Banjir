import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert("Login berhasil");

        navigate("/");
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Server tidak dapat diakses."
      );
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Login WebGIS</h2>

        <input
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-group">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="login-link">
          Belum punya akun?
          <Link to="/register"> Daftar</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;