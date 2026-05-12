import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import React, {useState,useEffect,} from "react";
import Chat from "./pages/Chat";
import axios from "axios";
import Companies from "./pages/Companies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployerDashboard from "./pages/EmployerDashboard";
import MyApplications from "./pages/MyApplications";
import AdminDashboard from "./pages/AdminDashboard";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import Notifications from "./pages/Notifications";
import CompanyDetails from "./pages/CompanyDetails";
import ProtectedRoute
from "./components/ProtectedRoute";

import RoleProtectedRoute
from "./components/RoleProtectedRoute";



function Home() {

  const [jobs, setJobs] =
  useState([]);

  const [search,
  setSearch] =
  useState("");

  const [location,
  setLocation] =
  useState("");


  useEffect(() => {

    fetchJobs();

  }, []);


  // =========================
  // Fetch Jobs
  // =========================
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


  // =========================
  // Apply Job + Resume Upload
  // =========================
  const applyJob = async (job) => {

    const userEmail =
    prompt("Enter your email");

    if (!userEmail) return;


    // Create File Input
    const resume =
    document.createElement("input");

    resume.type = "file";

    resume.accept = ".pdf";

    resume.click();


    // After Selecting File
    resume.onchange =
    async () => {

      const file =
      resume.files[0];

      if (!file) {

        alert(
          "Please select a PDF resume"
        );

        return;
      }


      // Create FormData
      const formData =
      new FormData();

      formData.append(
        "userEmail",
        userEmail
      );

      formData.append(
        "jobId",
        job._id
      );

      formData.append(
        "jobTitle",
        job.title
      );

      formData.append(
        "company",
        job.company
      );

      formData.append(
        "resume",
        file
      );


      try {

        // Apply Job
        const res =
        await axios.post(
          "http://localhost:5000/api/applications/apply",
          formData,
          {
            headers: {
              "Content-Type":
              "multipart/form-data",
            },
          }
        );

        alert(
          res.data.message
        );


        // Add Notification
        await axios.post(
          "http://localhost:5000/api/notifications/add",
          {
            userEmail,
            message:
            `You applied for ${job.title} at ${job.company}`,
          }
        );

      } catch (err) {

        console.log(err);

        alert(
          "Application Failed"
        );
      }
    };
  };


  // =========================
  // Save Job
  // =========================
  const saveJob = async (job) => {

    try {

      const res =
      await axios.post(
        "http://localhost:5000/api/saved-jobs/save",
        {
          userEmail:
          localStorage.getItem(
            "email"
          ),

          jobId:
          job._id,

          title:
          job.title,

          company:
          job.company,

          location:
          job.location,

          salary:
          job.salary,
        }
      );

      alert(
        res.data.message
      );

    } catch (err) {

      console.log(err);

      alert(
        "Failed to Save Job"
      );
    }
  };


  // =========================
  // Search Filter
  // =========================
  const filteredJobs =
  jobs.filter((job) => {

    return (

      job.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

      &&

      job.location
      .toLowerCase()
      .includes(
        location.toLowerCase()
      )
    );
  });


  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* Navbar */}
      <nav className="bg-blue-600 dark:bg-black text-white p-4 flex justify-between items-center shadow">

        <h1 className="text-3xl font-bold">

          Job Portal

        </h1>

        <div className="space-x-3">

          {/* Login */}
          <Link to="/login">

            <button className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

              Login

            </button>

          </Link>


          {/* Register */}
          <Link to="/register">

            <button className="bg-black dark:bg-gray-950 text-white px-4 py-2 rounded font-semibold">

              Register

            </button>

          </Link>


          {/* Employer */}
          {
            localStorage.getItem("role")
            === "employer" && (

              <Link to="/employer">

                <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold">

                  Employer

                </button>

              </Link>
            )
          }


          {/* Applications */}
          <Link to="/applications">

            <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold">

              My Applications

            </button>

          </Link>


          {/* Saved Jobs */}
          <Link to="/saved-jobs">

            <button className="bg-orange-500 text-white px-4 py-2 rounded font-semibold">

              Saved Jobs

            </button>

          </Link>


          {/* Notifications */}
          <Link to="/notifications">

            <button className="bg-pink-500 text-white px-4 py-2 rounded font-semibold">

              Notifications

            </button>

          </Link>


          {/* Profile */}
          <Link to="/profile">

            <button className="bg-cyan-500 text-white px-4 py-2 rounded font-semibold">

              Profile

            </button>

          </Link>


          {/* Admin */}
          {
            localStorage.getItem("role")
            === "admin" && (

              <Link to="/admin">

                <button className="bg-purple-600 text-white px-4 py-2 rounded font-semibold">

                  Admin

                </button>

              </Link>
            )
          }
          <Link to="/chat">

  <button className="bg-indigo-500 text-white px-4 py-2 rounded font-semibold">

    Chat

  </button>

</Link>


          {/* Logout */}
          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "role"
              );

              localStorage.removeItem(
                "email"
              );

              window.location.reload();
            }}

            className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
          >

            Logout

          </button>
          <Link to="/companies">

  <button className="bg-teal-500 text-white px-4 py-2 rounded">

    Companies

  </button>

</Link>
          <button
  onClick={() =>
    setDarkMode(
      !darkMode
    )
  }

  className="bg-gray-200 dark:bg-gray-800text-white px-4 py-2 rounded"
>

  {
    darkMode
    ? "Light Mode"
    : "Dark Mode"
  }

</button>

        </div>

      </nav>


      {/* Hero Section */}
      <div className="text-center py-16 bg-white shadow-sm">

        <h1 className="text-5xl font-bold text-gray-800">

          Find Your Dream Job

        </h1>

        <p className="mt-4 text-gray-500 text-lg">

          Search jobs from top companies

        </p>

      </div>


      {/* Search Filters */}
      <div className="p-10 bg-gray-200">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search by Job Title"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="p-3 rounded border dark:bg-gray-700 dark:border-gray-600"
          />


          <input
            type="text"
            placeholder="Filter by Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }

            className="p-3 rounded border dark:bg-gray-700 dark:border-gray-600"
          />

        </div>

      </div>


      {/* Jobs */}
      <div className="p-10">

        <h2 className="text-3xl font-bold mb-8">

          Latest Jobs

        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {filteredJobs.map((job) => (

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


              {/* Apply Button */}
              <button
                onClick={() =>
                  applyJob(job)
                }

                className="mt-4 mr-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >

                Apply Now

              </button>


              {/* Save Job Button */}
              <button
                onClick={() =>
                  saveJob(job)
                }

                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >

                Save Job

              </button>

            </div>

          ))}

        </div>

      </div>


      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-white text-center p-4">

        © 2026 Job Portal.
        All rights reserved.

      </footer>

    </div>
  );
}



function App() {
const [darkMode,
setDarkMode] =
useState(false);
useEffect(() => {

  if (darkMode) {

    document.documentElement.classList.add(
      "dark"
    );

  } else {

    document.documentElement.classList.remove(
      "dark"
    );
  }

}, [darkMode]);
  return (

    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/companies"
  element={<Companies />}
/>


        {/* Employer */}
        <Route
          path="/employer"
          element={
            <RoleProtectedRoute
              allowedRole="employer"
            >

              <EmployerDashboard />

            </RoleProtectedRoute>
          }
        />


        {/* Applications */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>

              <MyApplications />

            </ProtectedRoute>
          }
        />


        {/* Saved Jobs */}
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>

              <SavedJobs />

            </ProtectedRoute>
          }
        />


        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>

              <Notifications />

            </ProtectedRoute>
          }
        />


        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />


        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute
              allowedRole="admin"
            >

              <AdminDashboard />

            </RoleProtectedRoute>
          }
        />


        {/* Edit Job */}
        <Route
          path="/edit-job/:id"
          element={
            <RoleProtectedRoute
              allowedRole="admin"
            >

              <EditJob />

            </RoleProtectedRoute>
          }
        />

      </Routes>
      <Route
  path="/chat"
  element={
    <ProtectedRoute>

      <Chat />

    </ProtectedRoute>
  }
/>
<Route
  path="/company/:id"
  element={<CompanyDetails />}
/>

    </BrowserRouter>
  );
}

export default App;