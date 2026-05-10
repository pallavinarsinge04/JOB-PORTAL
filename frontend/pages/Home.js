import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Job Listings
      </h1>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="text-xl font-bold">{job.title}</h2>

          <p>{job.company}</p>
          <p>{job.location}</p>

          <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;