import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import API from "../api"; 
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    await API.post("/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal modal-open">
            <div className="modal-box">
              <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                <h3 className="font-bold text-lg">Signup</h3>

                <div className="mt-4 space-y-2">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Enter your fullname"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("fullname", { required: true })}
                  />
                  {errors.fullname && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <span>Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-80 px-3 py-1 border rounded-md outline-none"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">This field is required</span>
                  )}
                </div>

                <div className="flex justify-around mt-6">
                  <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                    Signup
                  </button>
                  <p className="text-xl">
                    Have account?{" "}
                    <button
                      className="underline text-blue-500 cursor-pointer"
                      onClick={() => {
                        const dialog = document.getElementById("my_modal_3");
                        if (dialog) dialog.showModal();
                      }}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Login />
    </>
  );
}

export default Signup;
