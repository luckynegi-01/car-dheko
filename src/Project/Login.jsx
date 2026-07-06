import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import Img1 from "../assets/Img1.png"
import SplitText from "./SplitText";

export default function Login() {

  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(
      (user) =>
        user.email === form.email &&
        user.password === form.password
    );

    if (!foundUser) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

     

    navigate("/home");
  };

  return (
    <div className="page-wrapper">
      <div className="signup-container">
        
        <div className="left-side">
          <div className="ambient-glow" />

          <div className="logo-area">
            <div className="logo-icon">M</div>
            <SplitText
            text="Mercedes-Benz"
            className="text-2xl font-semibold text-center"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />
          </div>

          <div className="image-block">
            <img
              src={Img1}
              alt="Mercedes"
              className="car-image"
            />
          </div>

          <div>
            <h2 className="car-title">
              Vision Mercedes - Maybach 6
            </h2>
            <p className="car-subtitle">
              Study of an ultra-stylish luxury-class coupé.
            </p>
          </div>
        </div>

        <div className="right-side">
          <div className="right-glow" />

          <div className="tab-nav">
            

            <button
              type="button"
              className="tab-inactive"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
            <button type="button" className="tab-active" onClick={() => navigate("/signup")}>
              Login 
              <div className="tab-indicator" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="form-wrapper">

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>

          </form>

          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">
              Or connect with
            </span>
            <div className="divider-line" />
          </div>

          <div className="social-row">
            <button className="social-btn">
              <User size={16} />
            </button>

            <button className="social-btn">
              <Mail size={16} />
            </button>

            <button className="social-btn">
              <Lock size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
    
  );
}