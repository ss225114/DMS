/* eslint-disable no-unused-vars */
import { useAuth } from "@/Modules/Auth/Context/AuthContext";
import { useState } from "react";
import lockImg from "@/assets/images/lock.jpg";
import { Link } from "react-router-dom";
import apiClient from "@/Modules/Auth/Context/apiClient";
import PassUpdateConfirm from "./PassUpdateConfirm";

const ChangePassword = () => {
  const { user } = useAuth();

  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleOldPass = (e) => {
    setData((prev) => ({ ...prev, oldPassword: e.target.value }));
  };

  const handleNewPass = (e) => {
    setData((prev) => ({ ...prev, newPassword: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put("/api/auth/update-password", data);
      if (response) {
        console.log(response);
        setModal(true);
      }
    } catch(err) {
      console.error(err)
    }
  };

  return (
    <>
      <div className="flex flex-row justify-around">
        <div className="p-6 pl-28 mt-7 flex flex-col justify-center gap-32">
        <div className="flex flex-col justify-center gap-6">
          <div className="text-4xl text-blue-500">USER INFORMATION</div>
          <div>
            <strong>NAME:</strong> &nbsp;&nbsp;{user.name}
          </div>
          <div>
            <strong>USERNAME:</strong> &nbsp;&nbsp;{user.username}
          </div>
          <div>
            <strong>EMAIL:</strong> &nbsp;&nbsp;{user.email}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="text-4xl text-blue-500">Change Password</div>
        <form onSubmit={handleSubmit} method="post">
          <div className="flex flex-col justify-center gap-6">
            <label htmlFor="Old Password">Old Password</label>
            <input
              type="password"
              className="p-1"
              onChange={handleOldPass}
              placeholder="Enter old password"
            />

            <label htmlFor="New Password">New Password</label>
            <input
              type="password"
              className="p-1"
              onChange={handleNewPass}
              placeholder="Enter new password"
            />
          </div>
          <div className="mt-16">
            <Link to="/">
              <button className="rounded-md hover:bg-gray-200 text-xl ">
              Cancel
            </button>
            </Link>
            <button
              type="submit"
              className="text-xl rounded-md hover:bg-gray-200"
            >
              Save
            </button>
          </div>
        </form>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img src={lockImg} className="h-96 w-96"/>
      </div>
      </div>

      {modal && <PassUpdateConfirm openModal={modal} closeModal={()=>{setModal(false)}}/>}
    </>
  );
};

export default ChangePassword;
