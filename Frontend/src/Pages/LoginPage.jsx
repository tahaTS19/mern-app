import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordInput from "../Components/PasswordInput.jsx";
import { validateEmail } from "../lib/utils.js";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import { useAuth } from "../Context/Contextprovider.jsx";
import { validatePassword } from "../lib/utils.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  api.defaults.withCredentials = true;
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid Email");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Invalid Password");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged In Successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("Error Logging In", error);
      if (error.response?.data?.message == "User not found") {
        toast.error("User Does not exist");
      } else {
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <h3 className="fixed top-6 left-50">Welcome To</h3>
      <h1 className="fixed top-10 left-50 text-4xl font-bold text-primary font-mono tracking-tight">NoteSpace</h1>
      <div className="container px-4">
        <div className="max-w-md mx-auto">
          <div className="card bg-base-300 bg-opacity-55 border border-green-950">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-control mb-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <PasswordInput
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!passwordTouched) setPasswordTouched(true);
                  }}
                />

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary w-full">
                    Login
                  </button>
                </div>
                <p className="text-sm text-center mt-4">
                  Dont have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary underline"
                  >
                    SignUp
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;