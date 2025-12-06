import React, { useContext, useState } from "react";
import { loginUser, getMe } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";
import "../styles/Login.css";
import "../styles/auth.css";

export default function Login() {
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            const data = await loginUser({ email, password });
            const token = data?.token;

            if (!token) {
                toast.error("Login failed: No token received");
                return;
            }

            localStorage.setItem("token", token);

            try {
                const me = await getMe();
                setUser(me);
            } catch {
                setUser({ email });
            }

            toast.success("Logged in");
            // console.log(data);
            navigate("/dashboard", { replace: true });


        } catch (err) {
            const msg = err?.response?.data || "Invalid email or password";
            toast.error(msg);
        }
    };

    return (
        <div className="login-container">

            {/* LEFT SECTION (Desktop only) */}
            {/* <div className="left-section">
            <h1 className="brand-title logo-text">
                <span className="sri">SRI</span>
                <span className="balaji"> BALAJI </span>
                <span className="ads">ADS</span>
            </h1>
        </div> */}

            {/* LOGIN CARD */}
            <div className="login-card">

                {/* TEXT LOGO ABOVE WELCOME BACK */}
                <h1 className="brand-title logo-text center-logo">
                    <span className="sri">SRI</span>
                    <span className="balaji"> BALAJI </span>
                    <span className="ads">ADS</span>
                </h1>

                <h2>Welcome Back</h2>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>

                <p>
                    <a href="/forgot-password">Forgot password?</a>
                </p>
            </div>
        </div>
    );

}
