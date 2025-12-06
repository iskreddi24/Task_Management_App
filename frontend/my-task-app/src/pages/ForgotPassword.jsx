import React, { useState } from "react";
import { sendOtp } from "../api/auth";
import { toast } from "react-toastify";
import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await sendOtp(email);
      localStorage.setItem("resetEmail", email);
      toast.success("OTP sent to email");
      window.location.href = "/reset-password";
    } catch {
      toast.error("Email not found");
    }
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <h2>Reset Password</h2>
        <p>Enter your registered email to receive OTP</p>
        <form onSubmit={handleSend}>
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button>Send OTP</button>
        </form>
        <p><a href="/login">Back to Login</a></p>
      </div>
    </div>
  );
}
