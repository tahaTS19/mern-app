import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import PasswordInput from '../Components/PasswordInput.jsx'
import { validateEmail, validatePassword } from '../lib/utils.js';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const SignUpPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // new change
  const [passwordTouched, setPasswordTouched] = useState(false);
  // new change

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Enter Your Name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid Email");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Invalid Password");
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password
      });

      console.log(response);
      if (response.data.success) {
        toast.success("Registration Successful!");
        navigate("/login");
      }

    } catch (error) {
      console.log("Error Signing Up", error);
      if (error.response?.status== 401) {
        toast.error("This user already exists");
      }
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center"> {/*layout chng*/}
      <h3 className="fixed top-6 left-50">Welcome To</h3>
      <h1 className="fixed top-10 left-50 text-4xl font-bold text-primary font-mono tracking-tight">ThinkBoard</h1>
      <div className="container px-4"> {/*layout chng*/}
        <div className='max-w-md mx-auto'>
          <div className='card bg-base-300 bg-opacity-55 border border-green-950'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <div className='form-control mb-4'>
                  <input type="text" placeholder="Name" className='input input-bordered bg-transparent'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-control mb-4'>
                  <input type="text" placeholder="Email" className='input input-bordered bg-transparent'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <PasswordInput
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    // new change
                    if (!passwordTouched) setPasswordTouched(true);
                    // new change
                  }}
                />
                
                <div className="card-actions justify-end">
                  <button type="submit" className='btn btn-primary w-full'>Sign Up</button>
                  
                </div>
                <p className='text-sm text-center mt-4'>
                  Already have an account?{" "}
                  <Link to="/login" className='font-medium text-primary underline'>Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;