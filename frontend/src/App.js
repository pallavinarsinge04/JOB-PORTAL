import React from "react";

function App() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Pune",
      salary: "₹8 LPA",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Microsoft",
      location: "Mumbai",
      salary: "₹10 LPA",
    },
    {
      id: 3,
      title: "MERN Stack Developer",
      company: "Infosys",
      location: "Nashik",
      salary: "₹6 LPA",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Job Portal
        </h1>

        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded font-semibold">
            Login
          </button>

          <button className="bg-black text-white px-4 py-2 rounded font-semibold">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-16 bg-white shadow">
        <h1 className="text-5xl font-bold text-gray-800">
          Find Your Dream Job
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Search jobs from top companies
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search jobs..."
            className="border p-3 w-80 rounded-l"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-r">
            Search
          </button>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-8">
          Latest Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
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

              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white text-center p-4 mt-10">
        © 2026 Job Portal. All rights reserved.
      </footer>
    </div>
  );
}
export default App;