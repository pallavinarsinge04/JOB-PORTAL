import { useState } from "react";

function PostJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(job);
  };

  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded"
      >
        <h1 className="text-3xl font-bold mb-5">
          Post Job
        </h1>

        <input
          placeholder="Job Title"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setJob({
              ...job,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Company"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setJob({
              ...job,
              company: e.target.value,
            })
          }
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;