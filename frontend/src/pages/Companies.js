import {
  useEffect,
  useState,
} from "react";
import {
  Link,
} from "react-router-dom";
import axios from "axios";

function Companies() {

  const [companies,
  setCompanies] =
  useState([]);

  useEffect(() => {

    fetchCompanies();

  }, []);


  // ==========================
  // Fetch Companies
  // ==========================
  const fetchCompanies =
  async () => {

    try {

      const res =
      await axios.get(
        "http://localhost:5000/api/companies/all"
      );

      setCompanies(
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-10">

      <h1 className="text-5xl font-bold mb-10 text-center">

        Company Profiles

      </h1>


      <div className="grid md:grid-cols-3 gap-6">

        {companies.map((company) => (

          <Link
  to={`/company/${company._id}`}
>

  <div key={company._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">

            {/* Logo */}
            <img
              src={company.logo}
              alt="logo"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />


            {/* Company Name */}
            <h2 className="text-2xl font-bold text-center mt-4">

              {company.companyName}

            </h2>


            {/* Location */}
            <p className="text-center text-gray-500 mt-2">

              📍 {company.location}

            </p>


            {/* Description */}
            <p className="mt-4 text-center">

              {company.description}

            </p>


            {/* Website */}
            <div className="text-center mt-5">

              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >

                Visit Website

              </a>

            </div>

          </div>
</Link>
        ))}

      </div>
      

    </div>
  

  );
}

export default Companies;