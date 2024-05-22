import React, { useState } from "react";
import "./LoginForm.scss";
import Card from "../card/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const initialUser = {
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(initialUser);

  const handleReset = async () => {
    try {
      if (user.password === user.confirmPassword) {
        if (user.password) {
            const password = user.password;
            const confirmPassword = user.confirmPassword;
          const res = await axios.post('/api/auth/reset-password',{
            code: 'privateCode', // code contained in the reset link of step 3.
            password: password,
            passwordConfirmation: confirmPassword,
          });
          if (!!res) {
            toast.success("Registered successfully!", {
              hideProgressBar: true,
            });
            console.log(res);
            navigate("/login");
          }
        }
      } else {
        toast.error("Passwords do not match.", {
          hideProgressBar: true,
        });
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

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match.");
    } else if (!user.password) {
      toast.error("Please fill in the password.");
    } else {
      // Form validation passed, you can submit the form or take any other action here.
      console.log("Form data:", user);
      //signUp();
    }
  };

  return (
    <center>
      <Card>
        <div className="title">Reset Password</div>
        <div className="inputs_container">
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleUserChange}
              required
            />
            <button type="submit" className="login_button" onClick={handleReset}>
              Reset
            </button>
          </form>
        </div>
        <a href="/login" className="createac">
          Go back to Login
        </a>
      </Card>
    </center>
  );
};
export default ResetPassword;
