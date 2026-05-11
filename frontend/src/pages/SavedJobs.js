import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function SavedJobs() {

  const [jobs, setJobs] =
  useState([]);

  const email =
  localStorage.getItem(
    "email"
  );


  useEffect(() => {

    fetchSavedJobs();

  }, []);


  // ==========================
  // Fetch Saved Jobs
  // ==========================
  const fetchSavedJobs =
  async () => {

    try {

      const res =
      await axios.get(
        `http://localhost:5000/api/saved-jobs/${email}`
      );

      setJobs(res.data);

    } catch (err) {

      console.log(err);

      alert(
        "Failed to fetch saved jobs"
      );
    }
  };


  // ==========================
  // Remove Saved Job
  // ==========================
  const removeJob =
  async (id) => {

    try {

      const res =
      await axios.delete(
        `http://localhost:5000/api/saved-jobs/delete/${id}`
      );

      alert(
        res.data.message
      );

      // Refresh jobs
      fetchSavedJobs();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to remove job"
      );
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-10 text-center">

        Saved Jobs

      </h1>


      {/* No Jobs */}
      {
        jobs.length === 0 && (

          <div className="text-center text-gray-500 text-xl">

            No Saved Jobs Found

          </div>
        )
      }


      {/* Jobs Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {jobs.map((job) => (

          <div
            key={job._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
          >

            {/* Job Title */}
            <h2 className="text-2xl font-bold text-blue-600">

              {job.title}

            </h2>


            {/* Company */}
            <p className="mt-3 text-gray-700 font-medium">

              {job.company}

            </p>


            {/* Location */}
            <p className="text-gray-500 mt-1">

              📍 {job.location}

            </p>


            {/* Salary */}
            <p className="text-green-600 font-bold mt-3">

              {job.salary}

            </p>


            {/* Remove Button */}
            <button
              onClick={() =>
                removeJob(job._id)
              }

              className="mt-5 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
            >

              Remove Job

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SavedJobs;