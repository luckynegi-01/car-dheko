import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import './Signup.css'
import {useNavigate} from 'react-router-dom'
import Img1 from "../assets/Img1.png"
import SplitText from "./SplitText";



export default function SignUp() {

  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  const [form,setform] = useState({
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });
  let navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

   let handlesubmit =(e)=>{
        e.preventDefault()

        let valid=true

        if(form.username.trim()==""){
            alert("please enter Name")
            valid=false
        }
        if(valid){
            let users=JSON.parse(localStorage.getItem('user'))||[]

            let alreadyuser =users.find((e)=>{

                return e.email == form.email
            })
            if(alreadyuser){
                alert('you are aleady a user')
                return
            }

            users.push(form)

            localStorage.setItem("users",JSON.stringify(users))
            navigate("/login");
        }
    }

  return (
    <>
    <div className="page-wrapper">
      <div className="signup-container"   >
        
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
            <h2 className="car-title">Vision Mercedes - Maybach 6</h2>
            <p className="car-subtitle">Study of an ultra-stylish luxury-class coupé.</p>
          </div>
        </div>

        <div className="right-side">
          <div className="right-glow" />

          <div className="tab-nav">
            
            <button type="button" className="tab-active">
              Sign up
              <div className="tab-indicator" />
            </button>
            <button type="button" className="tab-inactive"  onClick={() => navigate("/login")}>Login</button>
          </div>

          <form onSubmit={handlesubmit} className="form-wrapper">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>


            <div className="checkbox-row">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={form.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms" className="checkbox-label">
                I have read and agree to the{' '}
                <a href="#terms" className="terms-link">Access conditions</a>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>

          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">Or connect with</span>
            <div className="divider-line" />
          </div>

          <div className="social-row">
            <button type="button" className="social-btn">
              <User size={16} />
            </button>
            <button type="button" className="social-btn">
              <Mail size={16} />
            </button>
            <button type="button" className="social-btn">
              <Lock size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}