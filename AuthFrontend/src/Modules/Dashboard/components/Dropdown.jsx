import { useState } from "react";
import "../styles/StyleDropdown.css";
import { useAuth } from "@/Modules/Auth/Context/AuthContext";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="dropdown">
        {/* Button to toggle dropdown */}
        <div
          onClick={toggleDropdown}
          className="hover:bg-slate-300 transition-all"
          id="dropdown-button"
        >
          Profile &nbsp; &nbsp;{isOpen ? "▲" : "▼"}
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <div className="p-9 flex flex-col gap-4 w-96">
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
              </div>
            </li>
            <li className="dropdown-item">
              <div className="pl-9">
                <Link
                  to="/change-password"
                >
                <button className="w-40 bg-blue-600 text-white">
                  Change Password
                </button> 
                </Link>
              </div>
            </li>
            <li className="dropdown-item">
              <div className="pl-9">
                <button
                  className="w-40 bg-blue-600 text-white"
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
