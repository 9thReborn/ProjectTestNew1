import React, { useState } from "react";
import "./RegistrationPage.css";
import InputComponent from "./InputComponent";
import axios from "axios";
import redCross from "../../assets/Vector.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InputProps {
  email: string;
  fullName: string;
  phone: string;
  role: "Doctor";
  password: string;
  CV: File | null;
}
const DoctorsRegistration = () => {
  const [text, setText] = useState<InputProps>({
    email: "",
    fullName: "",
    phone: "",
    role: "Doctor",
    password: "",
    CV: null,
  });

  const url = "http://localhost:5000/auth/doctor";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData();
    formData.append("fullName", text.fullName);
    formData.append("email", text.email);
    formData.append("password", text.password);
    formData.append("phone", text.phone);
    formData.append("role", text.role);
    if (text.CV) {
      formData.append("CV", text.CV);
    }
    try {
      const resp = await axios.post(url, formData);
      if (resp.data.message) {
        toast.success(resp.data.message);
        setText({
          email: "",
          fullName: "",
          phone: "",
          role: "Doctor",
          password: "",
          CV: null,
        });
        setTimeout(() => {
          window.location.href = "/doctor-success";
        }, 1000);
      } else {
        toast.error(resp.data.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setText((prevText: any) => ({
      ...prevText,
      [name]: value,
    }));
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setText((prevFormData) => ({
      ...prevFormData,
      CV: file,
    }));
  };

  return (
    <div className="signup-reg">
      <div className="signup-right">
        <img src={redCross} alt="red cross" />
        <h2 className="register-h2">Let's get you registered</h2>
        <p>Get an account today and start enjoying our benefits</p>
        {/* <h1 className="animate">+ E-AID</h1> */}
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <div className="inputDiv">
            <label>Email address</label>
            <InputComponent
              type="email"
              className="input-field"
              value={text.email}
              placeholder="Name@companyemail.com"
              name="email"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <label>Full Name</label>
            <InputComponent
              type="text"
              className="input-field"
              value={text.fullName}
              placeholder="John Doe"
              name="fullName"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <label>Phone Number</label>
            <br />
            <InputComponent
              type="text"
              className="input-field"
              value={text.phone}
              placeholder="+234 800 0000 000"
              name="phone"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>

          <div className="inputDiv">
            <label>Password</label>
            <InputComponent
              type="password"
              className="input-field"
              value={text.password}
              placeholder="Password123@"
              name="password"
              required={true}
              disabled={false}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="CV" className="uploadCV">
              Upload your CV
            </label>
            <InputComponent
              type="file"
              className=""
              id="CV"
              placeholder=""
              name="CV"
              required={true}
              disabled={false}
              onChange={handleCVUpload}
              style={text.CV ? { display: "flex" } : { display: "none" }}
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="inputDiv">
            <button type="submit" className="submit">
              Sign Up
            </button>
          </div>
          <p>
            Already a member?{" "}
            <a href="/login" className="red">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorsRegistration;
