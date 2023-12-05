/**
 * 1. Get Form Data and Validate it(which will be handled by React-Hook-Form)
 * 2. Send the Form data by using `AppWrite CreateAccount Service`, which will trigger the `Login Service` by default
 * 2.1. If the request is success, call the getCurrentUser method of AppWrite Service
 * 2.1.1 If it is success update `Store` by using `login action of LoginSlice`
 * 2.2. If fails Just display the `error message` received through the network by using react state
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/loginSlice";
import { Button, Input } from "./Index.js";

function SignUp() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle Form Submission
  const handleSignUp = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data); // this method automatically triggers the `Login Service`
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(authLogin(user));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  //Handle Form validation error
  const onError = (data) => {
    let message;
    if (data.name) {
      message = data.name.message;
    } else if (data.email) {
      message = data.email.message;
    } else {
      message = data.password.message;
    }
    setError(message);
    console.log("Invalid Form Fields", data);
  };

  return (
    <div className="w-full py-8">
      <form
        onSubmit={handleSubmit(handleSignUp, onError)}
        className="w-full max-w-md mx-auto px-10 py-16 rounded-md flex flex-col items-center justify-between gap-8 bg-slate-600"
      >
        <div>
          <h3 className=" text-2xl mb-2 text-bold text-blue-200">
            Sign Up to MegaBlog
          </h3>
          <p className="text-sm mt-1 text-medium text-blue-200">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>

        <Input
          label="Name"
          type="text"
          placeholder="Enter Your name"
          {...register("name", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^[a-zA-Z0-9_.]{2,}?$/.test(value) ||
                "Please enter a valid name",
            },
          })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^([a-zA-Z0-9_.]{2,})@([a-zA-Z]{2,})\.([a-zA-Z]{2,6})(\.[a-zA-Z]{2,6})?$/.test(
                  value
                ) || "Please enter a valid email",
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\={}\[\]'":;<>,.?~\-\|\\]).{8,}$/.test(
                  value
                ) || "Please enter a valid password",
            },
          })}
        />

        <Button
          className="px-12 py-2 rounded-md text-lg text-medium text-white bg-blue-600 hover:bg-blue-300"
          type="submit"
        >
          Sign Up
        </Button>
        {error && (
          <p className="text-sm text-medium text-red-600 text-start">{error}</p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
