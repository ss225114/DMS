/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import apiClient from "@/Modules/Auth/Context/apiClient";
import { useAuth } from "@/Modules/Auth/Context/AuthContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const CreateFolder = (props) => {
  const { openModal, closeModal, currentFolder } = props;
  const { user, token } = useAuth();
  const ref = useRef();
  const [folder, setFolder] = useState({
    userId: user.id,
    original_name: "",
    file_name: "",
  });

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    console.log(user.id);
    console.log(currentFolder);
    
  }, [currentFolder, openModal, user.id]);

  const handleFolder = (e) => {
    e.preventDefault();
    if (e.target.value == "" || e.target.value == null) {
      setFolder((prev) => ({ ...prev, original_name: "New Folder" }));
      setFolder((prev) => ({ ...prev, file_name: "New Folder" }));
    } else {
      setFolder((prev) => ({ ...prev, original_name: e.target.value }));
      setFolder((prev) => ({ ...prev, file_name: e.target.value }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await apiClient.post(`/doc/folder/${currentFolder}`, folder)
      console.log(response);
      closeModal();
    } catch (err) {
      console.error("Error uploading file:", err);
    } 
  };
  
  return (
    <>
      <dialog ref={ref} onCancel={closeModal}   className="fixed top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-white rounded-lg shadow-md border-none overflow-hidden animate-fade-in backdrop:bg-black/50 backdrop:animate-backdrop-fade-in"
>
        <div className="p-4 text-lg font-bold border-b border-gray-300">Create Folder</div>
        <form onSubmit={handleSubmit} method="post">
          <div className="p-3">
            <label htmlFor="foldername">Folder Name:</label>
            <input
              type="text"
              className="p-1"
              onChange={handleFolder}
              placeholder="Enter folder name"
            />
          </div>
          <div className="flex justify-end p-4 border-t border-gray-300 space-x-2">
            <button onClick={closeModal} className="px-4 py-2 text-sm rounded-md hover:bg-gray-200">Cancel</button>
            <button type="submit"  className="px-4 py-2 text-sm rounded-md hover:bg-gray-200">
              Create
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default CreateFolder;
