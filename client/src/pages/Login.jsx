import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/slices/auth";
import { setUserDetails } from "../redux/slices/user";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const toastId = toast.loading(" Logging in...");

    try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logIn`, formData);

        if(!response.data.success){
          throw new Error("Error occured during login");
        }

        dispatch(setToken(response.data.token));
        dispatch(setUserDetails(response.data.userDetails));
        toast.dismiss(toastId);
        navigate("/home");
        toast.success(response.data.message);
        setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss(toastId);

      toast.error(error.response.data.message || "Something went wrong");
      
    }
  };
  return (
    
      <div className="bg-gray-800 w-100 px-8 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
            💬
          </div>

          <h2 className="text-4xl font-bold">Welcome Back</h2>

          <p className="text-gray-400">Login to continue chatting</p>
        </div>
        {/* Form */}
        <form className="mt-8 flex flex-col gap-5" onSubmit={submitHandler}>
          <div className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg">
            <label className="text-lg">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Enter your email"
              className="w-full mt-2 bg-transparent border border-gray-600 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg">
            <label className="text-lg">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
              className="w-full mt-2 bg-transparent border border-gray-600 px-3 py-2 rounded-md outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>

          <span className="text-gray-500 text-sm">OR</span>

          <div className="flex-1 h-px bg-gray-700"></div>
        </div>
        {/* Signup Link */}
        <div className="text-center">
          <p className="text-gray-400">Don't have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-500 hover:text-blue-400 mt-1 font-medium"
          >
            Create Account
          </button>
        </div>
      </div>
   
  );
};

export default Login;
