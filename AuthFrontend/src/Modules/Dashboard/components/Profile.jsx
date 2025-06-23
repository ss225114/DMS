import { useAuth } from "@/Modules/Auth/Context/AuthContext";
import Navbar02 from "@/Modules/components/Navbar02";
import Sidebar from "@/Modules/components/Sidebar";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />

        <div className="w-full">
          <Navbar02 />

          <div className="p-9 flex flex-col gap-4">
            <h1 className="text-4xl">USER DETAILS</h1>
            <div>
              <strong>NAME:</strong> &nbsp;&nbsp;{user.name}
            </div>
            <div>
              <strong>USERNAME:</strong> &nbsp;&nbsp;{user.username}
            </div>
            <div>
              <strong>EMAIL:</strong> &nbsp;&nbsp;{user.email}
            </div>
            <button className="w-40 bg-blue-600 text-white">
                Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
