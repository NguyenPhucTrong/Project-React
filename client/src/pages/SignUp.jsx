import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="bord p-3 rounded-lg"
          id="username"
          placeholder="username"
        />
        <input
          type="email"
          className="bord p-3 rounded-lg"
          id="email"
          placeholder="email"
        />
        <input
          type="password"
          className="bord p-3 rounded-lg"
          id="password"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {" "}
          Sign Up
        </button>
      </form>
      <div className="flex mt-5 gap-2">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:underline hover:opacity-65 ">
            {" "}
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
}
