/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// import "../styles/UploadFile.css";
import { useAuth } from "@/Modules/Auth/Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "@/Modules/Auth/Context/apiClient";

const UploadFile = (props) => {
  const { openModal, closeModal, currentFolder } = props;
  const { user, token } = useAuth();
  const ref = useRef();
  // const navigate = useNavigate()
  useEffect(() => {
    var inp = document.getElementById('folderSelect')
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    console.log(user.id);
    console.log(currentFolder);
    
  }, [currentFolder, openModal, user.id]);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    let folders = [];
    axios
      .get(`http://localhost:8080/doc/get/file/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        response.data.forEach((item) => {
          if (item.document_type == "folder") {
            folders.push(item);
          }
          console.log(folders);
          setOptions(folders);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id, token]);

  let data;

  const [file, setFile] = useState();

  function handleFile(event) {
    setFile(event.target.files[0]);
    data = {
      userId: user.id,
      file: file,
    };
    // setData((prev)=>({...prev, file: file}));
    console.log(file);

    console.log(data);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("userId", user.id); // Add userId to form data
    formData.append("file", file); // Add file to form data

    // Send the FormData to the backend
    try {
      const response = await apiClient
      .post(`/doc/upload/${currentFolder}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response);
        closeModal();
    } catch(err) {
      console.error("Error uploading file:", err);
    }
  };
  
  return (
    <>
      <dialog
  ref={ref}
  onCancel={closeModal}
  className="fixed top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-white rounded-lg shadow-md border-none overflow-hidden animate-fade-in backdrop:bg-black/50 backdrop:animate-backdrop-fade-in"
>
  <div className="p-4 text-lg font-bold border-b border-gray-300">
    File Upload
  </div>
  <form onSubmit={handleSubmit} method="post">
    <div className="p-4">
      <input type="file" onChange={handleFile} />
    </div>
    <div className="flex justify-end p-4 border-t border-gray-300 space-x-2">
      <button
        type="button"
        onClick={closeModal}
        className="px-4 py-2 text-sm rounded-md hover:bg-gray-200"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-800"
      >
        Upload
      </button>
    </div>
  </form>
</dialog>

    </>
  );
};

export default UploadFile;
{
  /* <div className="file-upload">
          <label htmlFor="file-input" className="file-label">
            <span className="file-button">Upload File</span>
            <span className="file-name">No file chosen</span>
          </label>
          <input type="file" id="file-input" className="file-input" />
        </div> */
}
{
  /* <dialog ref={ref} onCancel={closeModal} className="modal overflow-hidden">
        <div className="text-left w-full">Choose file</div>
        <input type="file" />
        <button onClick={closeModal}>Upload</button>
      </dialog> */
}
{/* <button onClick={show}>
              Show
            </button> */}
{/* <label htmlFor="folderSelect">Choose a folder:</label>
            <select
              id="folderSelect"
              className="select-element"
              value={selectedFolder}
              onChange={handleSelect}
            >
              <option value="" disabled>
          -- Select a folder --
        </option>
        {options.map((folder, index) => (
          <option key={index} value={folder.original_name}>
            {folder.original_name}
          </option>
        ))}
            </select>             */}
// const handleSelect = () => {
  //   setSelectedFolder(options[0].original_name)
  //   var inp = document.getElementById("folderSelect").value
  //   setSelectedFolder(inp);
  // };
  // function show() {
  //   console.log(selectedFolder);
  // }            





  // <dialog ref={ref} onCancel={closeModal} className="modal">
  //       <div className="modal-header">File Upload</div>
  //       <form onSubmit={handleSubmit} method="post">
  //         <div className="modal-body">
  //           <input type="file" onChange={handleFile} />
  //         </div>
  //         <div className="modal-footer">
  //           <button onClick={closeModal}>Cancel</button>
  //           <button
  //             type="submit"
  //             className="primary-button"
  //           >
  //             Upload
  //           </button>
  //         </div>
  //       </form>
  //     </dialog>