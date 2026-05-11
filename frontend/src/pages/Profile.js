import {
  useEffect,
  useState,
} from "react";

function Profile() {

  const [user,
  setUser] =
  useState({
    email: "",
    role: "",
  });


  useEffect(() => {

    // Get user data from localStorage
    const email =
    localStorage.getItem(
      "email"
    );

    const role =
    localStorage.getItem(
      "role"
    );

    setUser({
      email,
      role,
    });

  }, []);


  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">

          User Profile

        </h1>


        {/* Profile Image */}
        <div className="flex justify-center mb-6">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="w-28 h-28 rounded-full border"
          />

        </div>


        {/* Email */}
        <div className="mb-4">

          <h2 className="text-lg font-semibold text-gray-700">

            Email

          </h2>

          <p className="text-gray-500">

            {user.email}

          </p>

        </div>


        {/* Role */}
        <div className="mb-4">

          <h2 className="text-lg font-semibold text-gray-700">

            Role

          </h2>

          <p className="text-gray-500 capitalize">

            {user.role}

          </p>

        </div>


        {/* Status */}
        <div className="mt-6">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

            Active User

          </span>

        </div>

      </div>

    </div>
  );
}

export default Profile;