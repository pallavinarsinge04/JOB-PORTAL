import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import axios from "axios";

function CompanyDetails() {

  const { id } =
  useParams();

  const [company,
  setCompany] =
  useState(null);


  useEffect(() => {

    fetchCompany();

  }, []);


  // ==========================
  // Fetch Single Company
  // ==========================
  const fetchCompany =
  async () => {

    try {

      const res =
      await axios.get(
        `http://localhost:5000/api/companies/${id}`
      );

      setCompany(
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };


  if (!company) {

    return (

      <div className="text-center mt-20 text-3xl">

        Loading...

      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-10">

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">

        {/* Logo */}
        <img
          src={company.logo}
          alt="logo"
          className="w-40 h-40 rounded-full mx-auto object-cover"
        />

        {/* Company Name */}
        <h1 className="text-5xl font-bold text-center mt-6">

          {company.companyName}

        </h1>

        {/* Location */}
        <p className="text-center text-gray-500 mt-4 text-xl">

          📍 {company.location}

        </p>

        {/* Description */}
        <p className="mt-8 text-lg leading-8 text-center">

          {company.description}

        </p>

        {/* Website */}
        <div className="text-center mt-10">

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
          >

            Visit Website

          </a>

        </div>

      </div>

    </div>
  );
}

export default CompanyDetails;