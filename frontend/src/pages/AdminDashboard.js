import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

function AdminDashboard() {

  const [jobs, setJobs] =
  useState([]);

  const [applications,
  setApplications] =
  useState([]);


  useEffect(() => {

    fetchJobs();
    fetchApplications();

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


  // Fetch Applications
  const fetchApplications =
  async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/applications/all"
      );

      setApplications(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  // Delete Job
  const deleteJob = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/jobs/delete/${id}`
      );

      alert("Job Deleted");

      fetchJobs();

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">

        Admin Dashboard

      </h1>


      {/* Jobs Section */}
      <div className="mb-12">

        <h2 className="text-3xl font-bold mb-6">

          Manage Jobs

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <h3 className="text-2xl font-bold text-blue-600">

                {job.title}

              </h3>

              <p className="mt-2">
                {job.company}
              </p>

              <p>
                📍 {job.location}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                {job.salary}
              </p>

              <p className="mt-3 text-gray-600">
                {job.description}
              </p>


              {/* Edit Button */}
              <Link to={`/edit-job/${job._id}`}>

                <button className="mt-4 mr-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">

                  Edit Job

                </button>

              </Link>


              {/* Delete Button */}
              <button
                onClick={() =>
                  deleteJob(job._id)
                }

                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >

                Delete Job

              </button>

            </div>

          ))}

        </div>

      </div>


      {/* Applications Section */}
      <div>

        <h2 className="text-3xl font-bold mb-6">

          Applications

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {applications.map((app) => (

            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <h3 className="text-2xl font-bold text-green-600">

                {app.jobTitle}

              </h3>

              <p className="mt-2">
                {app.company}
              </p>

              <p>
                Applicant:
                {app.userEmail}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;