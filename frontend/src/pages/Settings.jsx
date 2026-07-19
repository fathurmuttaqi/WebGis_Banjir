import { useState, useEffect } from "react";
import "../styles/settings.css";

function Settings() {

  const user = JSON.parse(localStorage.getItem("user"));

  // Informasi Akun
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  // Password
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  // Pengaturan Peta
  const [zoom, setZoom] = useState("11");
  const [jenisPeta, setJenisPeta] = useState("OpenStreetMap");

  useEffect(() => {
    if (user) {
      setNama(user.nama || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSaveProfile = () => {
    alert("Informasi akun berhasil disimpan.");
  };

  const handleSaveMap = () => {
    alert("Pengaturan peta berhasil disimpan.");
  };

  const handleChangePassword = () => {

    if (!passwordLama || !passwordBaru || !konfirmasiPassword) {
      alert("Semua kolom password wajib diisi.");
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      alert("Konfirmasi password tidak sesuai.");
      return;
    }

    alert("Password berhasil diubah.");

    setPasswordLama("");
    setPasswordBaru("");
    setKonfirmasiPassword("");

  };

  return (
    <div className="main">

      <div className="title">
        <h1>Pengaturan</h1>
        <p>Konfigurasi aplikasi WebGIS Banjir</p>
      </div>

      {/* Informasi Akun */}
      <div className="setting-card">

        <h3>Informasi Akun</h3>

        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="btn-save"
          onClick={handleSaveProfile}
        >
          Simpan Perubahan
        </button>

      </div>

      {/* Password */}
      <div className="setting-card">

        <h3>Ganti Password</h3>

        <div className="form-group">
          <label>Password Lama</label>
          <input
            type="password"
            value={passwordLama}
            onChange={(e) => setPasswordLama(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password Baru</label>
          <input
            type="password"
            value={passwordBaru}
            onChange={(e) => setPasswordBaru(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Konfirmasi Password</label>
          <input
            type="password"
            value={konfirmasiPassword}
            onChange={(e) => setKonfirmasiPassword(e.target.value)}
          />
        </div>

        <button
          className="btn-save"
          onClick={handleChangePassword}
        >
          Ubah Password
        </button>

      </div>

      {/* Pengaturan Peta */}
      <div className="setting-card">

        <h3>Pengaturan Peta</h3>

        <div className="form-group">
          <label>Default Zoom</label>

          <select
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          >
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

        </div>

        <div className="form-group">

          <label>Jenis Peta</label>

          <select
            value={jenisPeta}
            onChange={(e) => setJenisPeta(e.target.value)}
          >
            <option value="OpenStreetMap">OpenStreetMap</option>
            <option value="Satellite">Satellite</option>
          </select>

        </div>

        <button
          className="btn-save"
          onClick={handleSaveMap}
        >
          Simpan Pengaturan
        </button>

      </div>

    </div>
  );
}

export default Settings;