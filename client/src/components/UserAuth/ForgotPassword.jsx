import React, { useState } from "react";
import "./LoginForm.scss";
import Card from "../card/card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../utils/api";

const ForgotPassword = () => {
  const initialUser = {
    email: "",
  };
  const [user, setUser] = useState(initialUser);

  const handleForgot = async () => {
    try {
      if (user.email) {
        const email= user.email;
        const res = await forgotPassword.post('/api/auth/forgot-password',{
            email: email,
        });
        if (!!res) {
          toast.success("Password reset link sent successfully!", {
            hideProgressBar: true,
          });
          console.log(res);
        }
      } else {
        toast.error("Please fill in the email.", {
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

    if (!user.email) {
      toast.error("Please fill in the email.");
    } else {
      console.log("Form data:", user);
    }
  };

  return (
    <center>
      <Card>
        <div className="title">Forgot Password</div>
        <div className="inputs_container">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              required
            />
            <button type="submit" className="login_button" onClick={handleForgot}>
              Submit
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

export default ForgotPassword;
