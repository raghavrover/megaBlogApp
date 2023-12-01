/**
 * 1. Get Form Data and Validate it(which will be handled by React-Hook-Form)
 * 2. Send the Form data by using `AppWrite Login Service`
 * 2.1. If the request is success, call the getCurrentUser method of AppWrite Service
 * 2.1.1 If it is success update `Store` by using `login action of LoginSlice``
 * 2.2. If fails Just display the `error message` received through the network
 */

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authService } from "../appwrite/auth";
import { login as authLogin } from "../store/loginSlice";
import Input from "./Input";
import Button from "./Button";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Handle Form Submission
  const login = async () => {};

  return (
    <div className="w-full py-8">
      <form
        onSubmit={handleSubmit(login)}
        className="w-full max-w-md mx-auto px-10 py-16 rounded-md flex flex-col items-center justify-between gap-8 bg-slate-600"
      >
        <div>
          <h3 className=" text-2xl mb-2 text-bold text-blue-200">
            Login to MegaBlog
          </h3>
          <p className="text-sm mt-1 text-medium text-blue-200">
            Don&apos;t have an account ?{" "}
            <Link to="/sign-up" className="text-blue-600">
              {" "}
              Sign Up
            </Link>
          </p>
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: () =>
                /^[a-z]$/.test() || "Please enter a valid email",
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
              matchPattern: () =>
                /^[a-z]$/.test() || "Please enter a valid password",
            },
          })}
        />

        <Button
          className="px-12 py-2 rounded-md text-lg text-medium text-slate-800 bg-white"
          type="button"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
