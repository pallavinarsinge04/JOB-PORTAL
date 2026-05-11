import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Notifications() {

  const [notifications,
  setNotifications] =
  useState([]);

  const email =
  localStorage.getItem(
    "email"
  );


  useEffect(() => {

    fetchNotifications();

  }, []);


  // ======================
  // Fetch Notifications
  // ======================
  const fetchNotifications =
  async () => {

    try {

      const res =
      await axios.get(
        `http://localhost:5000/api/notifications/${email}`
      );

      setNotifications(
        res.data
      );

    } catch (err) {
      console.log(err);
    }
  };


  // ======================
  // Delete Notification
  // ======================
  const deleteNotification =
  async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/notifications/delete/${id}`
      );

      fetchNotifications();

    } catch (err) {
      console.log(err);
    }
  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">

        Notifications

      </h1>


      {
        notifications.length === 0 && (

          <p className="text-gray-500 text-xl">

            No Notifications

          </p>
        )
      }


      <div className="space-y-5">

        {notifications.map((note) => (

          <div
            key={note._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >

            <div>

              <p className="text-lg">

                {note.message}

              </p>

              <p className="text-gray-400 text-sm mt-1">

                {
                  new Date(
                    note.createdAt
                  ).toLocaleString()
                }

              </p>

            </div>


            <button
              onClick={() =>
                deleteNotification(
                  note._id
                )
              }

              className="bg-red-500 text-white px-4 py-2 rounded"
            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;