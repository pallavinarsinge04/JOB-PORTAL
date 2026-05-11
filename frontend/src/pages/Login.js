import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
  useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
      await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Save Token
      localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "role",
  res.data.user.role
);
      alert("Login Successful");

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data ||
        "Login Failed"
      );
    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
          required
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700">

          Login

        </button>

      </form>

    </div>
  );
}

export default Login;