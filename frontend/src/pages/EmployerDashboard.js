import { useState } from "react";
import axios from "axios";

function EmployerDashboard() {

  const [jobData, setJobData] =
  useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]:
      e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res =
      await axios.post(
        "http://localhost:5000/api/jobs/create",
        jobData
      );

      alert(res.data.message);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[500px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Post New Job
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded"
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700">
          Post Job
        </button>

      </form>

    </div>
  );
}

export default EmployerDashboard;