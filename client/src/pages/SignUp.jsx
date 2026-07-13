import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitFormDataHandler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must include 8 characters");
      return;
    }

    const toastId = toast.loading("Creating account...");

    try {
      setLoading(true);
      
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${BASE_URL}/signUp`, formData);
      if (!response.data.success) {
        throw new Error("Error occured during signUp");
      }
      toast.dismiss(toastId);
      toast.success(response.data.message);
      setLoading(false);

      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.response.data.message || "Somemthing went wrong");
    }
  };
  return (
    <div className="bg-gray-800 w-110 px-8 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300">
      <div className="flex flex-col gap-2 items-center">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
          💬
        </div>

        <h2 className="text-4xl font-bold">Create Account</h2>

        <p className="text-gray-400">Join and start chatting today</p>
      </div>

      <form className="mt-8 flex flex-col gap-5" onSubmit={ submitFormDataHandler }>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[18px]">First Name</label>

            <input
              type="text"
              placeholder="Enter first name"
              className="w-full bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg outline-none
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              required
              onChange={onChangeHandler}
              name="firstName"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[18px]">Last Name</label>

            <input
              type="text"
              placeholder="Enter last name"
              className="w-full bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg outline-none
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              required
              onChange={onChangeHandler}
              name="lastName"
            />
          </div>
        </div>

        <div
          className="w-full bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg outline-none
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        >
          <label className="text-[18px]">Email ID</label>
          <input
            type="email"
            className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded-md 
                outline-none"
            placeholder="Enter your email id"
            required
            onChange={onChangeHandler}
            name="email"
          />
        </div>

        <div
          className="w-full bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg outline-none 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        >
          <label className="text-[18px]">Password</label>
          <input
            type="password"
            className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded-md 
                outline-none"
            placeholder="Enter your password"
            required
            onChange={onChangeHandler}
            name="password"
          />
        </div>

        <div
          className="w-full bg-gray-900 border border-gray-700 px-4 py-3 rounded-lg outline-none
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
        >
          <label className="text-[18px]">Confirm Password</label>
          <input
            type="password"
            className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded-md outline-none"
            placeholder="Confirm password"
            required
            onChange={onChangeHandler}
            name="confirmPassword"
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition shadow-lg mt-4"
          type="submit"
        >
          Create Account
        </button>
      </form>
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-700"></div>

        <span className="text-gray-500 text-sm">OR</span>

        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-gray-400">Already have an account?</p>

        <button
          disabled={loading}
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:text-blue-400 mt-1 font-medium"
        >
          Login
        </button>
      </div>
    </div>
    
  );
};

export default SignUp;
