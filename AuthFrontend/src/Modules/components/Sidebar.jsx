/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const {modal, setModal, dialog, setDialog} = props
  return (
    <>
      <div className="flex flex-col justify-between w-64  bg-blue-700 min-h-screen h-full ">
        <div className="flex flex-col">
          <h1 className="p-5 text-white border-b border-white text-center text-2xl">
            D.M.S.
          </h1>
            <div className="p-5 text-white border-b border-white cursor-pointer hover:bg-blue-900 transition-all" onClick={() => setModal(true)}>Upload File</div>
            <div className="p-5 text-white border-b border-white cursor-pointer hover:bg-blue-900 transition-all" onClick={() => setDialog(true)}>Create folder</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
{/* <Link
            to="/add-player"
            className="p-5 text-white border-b border-white hover:bg-blue-900 transition-all"
          >
            Add Players
          </Link>
          <Link
            to="/update-player-proflie"
            className="p-5 text-white border-b border-white hover:bg-blue-900 transition-all"
          >
            Update player profile
          </Link> */}