import React, { useState, useEffect } from "react";
import "./LoginForm.scss"
import Card from "../card/card";
import {
    FcGoogle
} from "react-icons/fc";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import { Route, useNavigate } from "react-router-dom";
import { storeUser } from "../../utils/helpers";
const initialUser = { password: "", identifier: "" };

const LoginForm = () => {
 // <Route path="/api/auth/google/callback" component={GoogleCallbackHandler} />
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
      const { name, value } = target;
      setUser((currentUser) => ({
        ...currentUser,
        [name]: value,
      }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (
          !user.identifier ||
          !user.password
        ) {
          toast.error('Please fill in the credentials.');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.identifier)) {
          toast.error('Invalid email format');
        } else {
          // Form validation passed, you can submit the form or take any other action here.
          console.log('Form data:', user);
            handleLogin();
        }
      };
  
    const handleLogin = async () => {
      const url = `http://localhost:1337/api/auth/local`;
      try {
        if (user.identifier && user.password) {
          const { data } = await axios.post(url, user);
          if (data.jwt) {
            storeUser(data);
            toast.success("Logged in successfully!", {
              hideProgressBar: true,
            });
            setUser(initialUser);
            navigate("/");
          }
        }
      } catch (error) {
        toast.error(error.message, {
          hideProgressBar: true,
        });
      }
    };

    const handleGoogleLogin = async () => {
      window.location.href ="https://1e99-43-224-128-101.ngrok-free.app/api/connect/google";
    };
    useEffect(() => {
      const query = window.location.search;
    const idTokenIndex = query.indexOf('id_token=');
    
    if (idTokenIndex !== -1) {
      const idToken = query.substring(idTokenIndex + 'id_token='.length);
       // console.log("Received id_token:", idToken);
        const url = `http://localhost:1337/api/auth/google/callback?id_token=${idToken}`;
      
        axios.get(url)
          .then(response => {
            const data = response.data;
            console.log(data);
            if (data.jwt) {
              
              storeUser(data);
              toast.success("Logged in successfully!", {
                hideProgressBar: true,
              });
              setUser(initialUser);
              navigate("/");
            } else {
              console.error("No JWT found in the response.");
            }
          })
          .catch(error => {
            console.error("Error while making the request:", error);
          });
      }
    }, []);
  

    
return (
    <center>
<Card>
      <h1 className="title">Sign In</h1>
      <p className="subtitle">
        Please log in using your email and password!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inputs_container">
          <input
            name="identifier"
            type="email"
            placeholder="Email"
            value={user.identifier}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login_button">Submit</button>
      </form>
      <div className="link_container">
        <a href="" className="small">
          Forgot Password?
        </a>
      <a href="/Signup" className="createac">Create an account</a>
      </div>
      <hr />
      <div className="stlf">Sign In Using</div>
      <div className="icons">
         <div onClick={handleGoogleLogin}>
          <FcGoogle className="iconlf" />
          </div>            
      </div><ToastContainer/>
    </Card></center>
    );
};

export default LoginForm;