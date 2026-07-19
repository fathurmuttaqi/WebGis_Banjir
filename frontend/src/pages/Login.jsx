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

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

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

  // JSX tetap seperti sebelumnya...
}

export default Login;