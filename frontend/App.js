import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployerDashboard from "./pages/EmployerDashboard";
import MyApplications from "./pages/MyApplications";

import ProtectedRoute
from "./components/ProtectedRoute";



function Home() {

  const [jobs, setJobs] = useState([]);


  useEffect(() => {

    fetchJobs();

  }, []);


  // Fetch Jobs
  const fetchJobs = async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/jobs/all"
      );

      setJobs(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  // Apply Job
  const applyJob = async (job) => {

    const userEmail =
    prompt("Enter your email");

    if (!userEmail) return;

    try {

      const res =
      await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          userEmail,
          jobId: job._id,
          jobTitle: job.title,
          company: job.company,
        }
      );

      alert(res.data.message);

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">

        <h1 className="text-3xl font-bold">
          Job Portal
        </h1>

        <div className="space-x-4">

          <Link to="/login">
            <button className="bg-white text-blue-600 px-4 py-2 rounded font-semibold">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-black text-white px-4 py-2 rounded font-semibold">
              Register
            </button>
          </Link>

          <Link to="/employer">
            <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold">
              Employer
            </button>
          </Link>

          <Link to="/applications">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold">
              My Applications
            </button>
          </Link>

          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
          >

            Logout

          </button>

        </div>

      </nav>


      {/* Hero Section */}
      <div className="text-center py-16 bg-white">

        <h1 className="text-5xl font-bold text-gray-800">
          Find Your Dream Job
        </h1>

        <p className="mt-4 text-gray-500 text-lg">
          Search jobs from top companies
        </p>

      </div>


      {/* Jobs Section */}
      <div className="p-10">

        <h2 className="text-3xl font-bold mb-8">
          Latest Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition"
            >

              <h3 className="text-2xl font-bold text-blue-600">
                {job.title}
              </h3>

              <p className="mt-2 text-gray-700">
                {job.company}
              </p>

              <p className="text-gray-500">
                📍 {job.location}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                {job.salary}
              </p>

              <p className="mt-3 text-gray-600">
                {job.description}
              </p>

              <button
                onClick={() => applyJob(job)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >

                Apply Now

              </button>

            </div>

          ))}

        </div>

      </div>


      {/* Footer */}
      <footer className="bg-black text-white text-center p-4">

        © 2026 Job Portal. All rights reserved.

      </footer>

    </div>
  );
}



function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/employer"
          element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;