function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="border w-full p-3 mb-4 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-4 rounded"
        />

        <select className="border w-full p-3 mb-4 rounded">

          <option>
            Job Seeker
          </option>

          <option>
            Employer
          </option>

        </select>

        <button className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;