import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function MyApplications() {

  const [applications,
  setApplications] =
  useState([]);


  useEffect(() => {

    fetchApplications();

  }, []);


  const fetchApplications =
  async () => {

    const userEmail =
    prompt("Enter your email");

    if (!userEmail) return;

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/applications/all"
      );

      const filteredApps =
      res.data.filter(
        (app) =>
        app.userEmail === userEmail
      );

      setApplications(
        filteredApps
      );

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Applications
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {applications.map((app) => (

          <div
            key={app._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold text-blue-600">
              {app.jobTitle}
            </h2>

            <p className="mt-2 text-gray-700">
              {app.company}
            </p>

            <p className="text-green-600 mt-2">
              Applied Successfully
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyApplications;