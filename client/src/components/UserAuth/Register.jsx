import React, { useState } from "react";
import "./LoginForm.scss"
import Card from "../card/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
const initialUser = { email: "", password: "", username: "" };

const Register = () => {
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const signUp = async () => {
        try {
          const url = `http://localhost:1337/api/auth/local/register`;
          if (user.username && user.email && user.password) {
            const res = await axios.post(url, user);
            if (!!res) {
              toast.success("Registered successfully!", {
                hideProgressBar: true,
              });
              console.log(res);
              setUser(initialUser);
              navigate("/login");
            }
          }
        } catch (error) {
          toast.error(error.message, {
            hideProgressBar: true,
          });
        }
      };
    
      const handleUserChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
          ...currentUser,
          [name]: value,
        }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (
          !user.username ||
          !user.email ||
          !user.password
        ) {
          toast.error('Please fill in the credentials.');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
          toast.error('Invalid email format');
        } else {
          // Form validation passed, you can submit the form or take any other action here.
          console.log('Form data:', user);
            signUp();
        }
      };
  
    return(
        <center>
            <Card >
                <div className="title">Register</div>
                <div className="inputs_container">
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='username' name="username" value={user.username}  onChange={handleUserChange} required/>                    
                    <input type='email' placeholder='email' name="email" value={user.email}  onChange={handleUserChange} required/>                    
                    <input type='password' placeholder='password' name="password" value={user.password}  onChange={handleUserChange} required/>                    
                    <button type="submit" className="login_button">Sign Up</button>
                </form></div>
                <a href="/login" className="createac">Go back to Login</a>
            </Card>
        </center>
    );
};
export default Register;