/* eslint-disable no-unused-vars */
import axios from "axios";
import { useAuth } from "../Auth/Context/AuthContext";
import DmsNavbar from "../components/DmsNavbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import UploadFile from "./DMScomponents/UploadFile";
import CreateFolder from "./DMScomponents/CreateFolder";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  
  return (
    <>
      <div className="flex flex-row">
        <Sidebar
          modal={modal}
          setModal={setModal}
          dialog={dialog}
          setDialog={setDialog}
        />

        <div className="w-full">
          <DmsNavbar />
          <div className="mt-36">
            <h1 className="text-center text-7xl mt-9 text-blue-500">
              Welcome {user.name}!
            </h1>
          </div>
          <div>
            <p className="text-center mt-7">
              DMS is a document managing platform which gives you an efficient
              way of
              <br />
              storing and managing documents
            </p>
          </div>
          
        </div>
      </div>
      <div></div>
      {modal && (
        <UploadFile openModal={modal} closeModal={() => setModal(false)} />
      )}
      {dialog && (
        <CreateFolder openModal={dialog} closeModal={() => {setDialog(false);}} />
      )}
    </>
  );
};

export default Dashboard;
