import React, { useState } from "react";
import twitterImag from "../assest/Twitter-X-Line-Icon-PNG-758x473-removebg-preview.png";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getLoading } from "../redux/userSlice";


const Login = () => {
  const isLoading = useSelector(store=>store.user.isLoading)
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5"
            width={"300px"}
            src={twitterImag}
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-gray-700 text-6xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl text-gray-600 font-bold">
            {isLogin ? "Login" : "Singup"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className="bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white">
            {`${isLoading ?   "Login" : "Create Accounte"}`}
            </button>
            <h1 className="text-gray-300">
              {isLogin ? "Do not have an account?" : "Already have an account?"}{" "}
              <span
                onClick={loginSignupHandler}
                className="font-bold text-blue-600 cursor-pointer"
              >
                      {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
