import { Button } from "./button";
import { InputField } from "./input-field";
import { useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import axios from "axios";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const [loginDetails, setLoginDetails] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const loginUrl = "http://localhost:5000/auth/login";
  const googleLoginUrl = "http://localhost:5000/auth/google-login";

  const handleLoginInput = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginDetails);
    try {
      const response = await axios.post(loginUrl, loginDetails);
      console.log(response);

      if (response.data.message === "You have successfully logged in as user") {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        setTimeout(() => {
          localStorage.setItem("role", JSON.stringify(response.data.user));
          window.location.href = "/dashboard";
        }, 3000);
      } else if (
        response.data.message === "You have successfully logged in as admin"
      ) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        setTimeout(() => {
          localStorage.setItem("role", JSON.stringify(response.data.admin));
          window.location.href = "/doctors";
        }, 3000);
      } else {
        toast.error(response.data.Error);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.Error);
    }
    setLoginDetails({ email: "", password: "" });
  };

  return (
    <div className="login-container">
      <div className="left">
        <div className="cross">+</div>
        <h1 className="welcome">Welcome back</h1>
        <span className="enter-details">
          Enter your details let's get your account ready for you
        </span>
      </div>
      <div className="right">
        <form onSubmit={handleSignIn} className="login-form">
          <label htmlFor="title" className="form-title">
            Log In
          </label>
          <LoginSocialGoogle
            client_id={
              "1002614398445-t9o9dq8hcosuvpld2cge2bkroq9lje36.apps.googleusercontent.com"
            }
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            redirect_uri="http://127.0.0.1:5173"
            onResolve={({
              provider,
              data,
            }: {
              provider: string;
              data: any;
            }) => {
              console.log(provider, data);
              try {
                const response = axios.post(googleLoginUrl, {
                  email: data.email,
                });
                response
                  .then((data: any) => {
                    console.log(data);
                    document.cookie = data.data.token;
                    if (data.data.message === "Login successful") {
                      localStorage.setItem(
                        "token",
                        JSON.stringify(data.data.token)
                      );
                      toast.success(data.data.message);
                      setTimeout(() => {
                        window.location.href = "/dashboard";
                      }, 3000);
                    } else {
                      toast.error(data.data.message);
                    }
                  })
                  .catch((error: any) => {
                    toast.error(error.response.data.error);
                  });
              } catch (error: any) {
                toast.error(error.response.data.error);
              }
            }}
            onReject={(err: any) => {
              console.log(err.response.data.error);
              toast.error(err.response.data.error);
            }}
          >
            <GoogleLoginButton className="google-login" />
          </LoginSocialGoogle>
          <div className="or">
            <hr />
            <span className="or-span">Or</span>
            <hr />
          </div>
          <label htmlFor="title" className="email">
            Email address
          </label>
          <InputField
            type="email"
            value={loginDetails.email}
            onChange={handleLoginInput}
            placeHolder="Name@companyemail.com"
            className="email-input"
            name="email"
            required={true}
          />
          <label htmlFor="title" className="password">
            Password
          </label>
          <InputField
            type="password"
            value={loginDetails.password}
            onChange={handleLoginInput}
            placeHolder="Password123@"
            className="password-input"
            name="password"
            required={true}
          />
          <a href="/forgot-password" className="forgot">
            <span>Forgot Password?</span>
          </a>
          <Button
            type="submit"
            btnText="Sign In"
            className="signin-btn"
            onClick={() => {}}
          />
          <p className="not-a-member">
            Not a member?
            <a href="/signup" className="sign-up">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
