import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async () => {
    if (!nama || !email || !password || !konfirmasi) {
      alert("Semua data wajib diisi.");
      return;
    }

    if (password !== konfirmasi) {
      alert("Konfirmasi password tidak sesuai.");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        nama,
        email,
        password,
      });

      alert(res.data.message);

      if (res.data.success) {
        navigate("/login");
      }

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Server tidak dapat diakses."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Daftar Akun</h2>

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        {/* Konfirmasi Password */}
        <div className="password-group">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi Password"
            value={konfirmasi}
            onChange={(e) => setKonfirmasi(e.target.value)}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button
          className="login-btn"
          onClick={handleRegister}
        >
          Daftar
        </button>

        <p className="login-link">
          Sudah punya akun?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;