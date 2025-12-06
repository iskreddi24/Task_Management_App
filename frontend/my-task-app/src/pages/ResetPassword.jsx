import React, { useState } from "react";
import { resetPassword } from "../api/auth";
import { toast } from "react-toastify";
import "../styles/ResetPassword.css";

export default function ResetPassword() {
  const email = localStorage.getItem("resetEmail");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email, otp, newPassword });
      toast.success("Password reset success");
      localStorage.removeItem("resetEmail");
      window.location.href = "/login";
    } catch {
      toast.error("Invalid/expired OTP");
    }
  };

  return (
    <div className="reset-container">
      <div className="card">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <label>OTP</label>
          <input required value={otp} onChange={(e) => setOtp(e.target.value)} />
          <label>New Password</label>
          <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button>Reset</button>
        </form>
      </div>
    </div>
  );
}
