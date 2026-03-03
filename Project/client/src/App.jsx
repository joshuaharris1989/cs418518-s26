import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard.jsx";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import VerifyOtp from "./VerifyOtp.jsx";

function App() {
  // ✅ this is the missing function
  const registerUser = async (payload) => {
    const res = await fetch(import.meta.env.VITE_API_KEY + "user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      // backend usually returns { message: "..." }
      throw new Error(json?.message || "Registration failed");
    }

    return json;
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* ✅ PASS THE PROP HERE */}
          <Route path="/signup" element={<Signup onRegister={registerUser} />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;