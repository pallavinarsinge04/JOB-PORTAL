import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function EditJob() {

  const { id } = useParams();

  const navigate =
  useNavigate();

  const [jobData,
  setJobData] =
  useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });


  useEffect(() => {

    fetchJob();

  }, []);


  // Fetch Job
  const fetchJob = async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/jobs/all"
      );

      const singleJob =
      res.data.find(
        (job) => job._id === id
      );

      setJobData(singleJob);

    } catch (err) {
      console.log(err);
    }
  };


  // Handle Change
  const handleChange = (e) => {

    setJobData({
      ...jobData,
      [e.target.name]:
      e.target.value,
    });
  };


  // Update Job
  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
      await axios.put(
        `http://localhost:5000/api/jobs/update/${id}`,
        jobData
      );

      alert(res.data.message);

      navigate("/admin");

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

          Edit Job

        </h1>


        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border w-full p-3 mb-4 rounded"
        />


        <input
          type="text"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          placeholder="Company"
          className="border w-full p-3 mb-4 rounded"
        />


        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border w-full p-3 mb-4 rounded"
        />


        <input
          type="text"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="border w-full p-3 mb-4 rounded"
        />


        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border w-full p-3 mb-4 rounded"
        />


        <button className="bg-blue-600 text-white w-full py-3 rounded">

          Update Job

        </button>

      </form>

    </div>
  );
}

export default EditJob;