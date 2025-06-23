/* eslint-disable no-unused-vars */
import DmsNavbar from "@/Modules/components/DmsNavbar";
import Sidebar from "@/Modules/components/Sidebar";
import UploadFile from "./UploadFile";
import CreateFolder from "./CreateFolder";
import { useAuth } from "@/Modules/Auth/Context/AuthContext";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ViewFile from "./ViewFile";
import Thumbnail from "./Thumbnail";
import apiClient from "@/Modules/Auth/Context/apiClient";
import folderIcon from "@/assets/images/folder_icon.png";


// import apiClient from "@/Modules/Auth/Context/apiClient";

const DocumentWindow = () => {
  const { user, token } = useAuth();
  const [error, setError] = useState(false);
  const [showFile, setShowFile] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [file, setFile] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [fileName, setFileName] = useState("");
  const [path, setPath] = useState("");
  const [items, setItems] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null); // Track the current folder root?root.id:
  const [parentFolder, setParentFolder] = useState(null); // Track parent folder for navigation
  const [rootId, setRootId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [folderSelected, setFolderSelected] = useState(null);
  const [docSelected, setDocSelected] = useState(null);
  const [extension, setExtension] = useState("");
  const menuRef = useRef();

  // Handle right-click
  const handleContextMenuFolder = (e, folder) => {
    e.preventDefault();
    setFolderSelected(folder.id);
    setOpenFolder(folder);
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };

  const handleContextMenuFile = (e, file) => {
    e.preventDefault();
    setDocSelected(file.id);
    setShowFile(file);
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };

  // Handle click anywhere to close
  const handleClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuPosition(null);
      setDocSelected(null);
      setFolderSelected(null);
    }
  };

  // Add/remove global click listener
  useEffect(() => {
    if (menuPosition) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
  }, [menuPosition]);

  let root;
  const fetchItems = async (folderId) => {
    try {
      console.log("Making a GET request...");
      const response = await apiClient.get(`/doc/get/file/${user?.id}`);
      console.log("Response data:", response.data);
      const fetchedItems = response.data;
      root = response.data[0];
      setRootId(root.id);
      // If `folderId` is null, fetch root folder items
      if (!folderId) {
        setItems(
          fetchedItems.filter(
            (item) => item.parent_id != 0 && item.parent_id === root.id
          )
        );
        setParentFolder(root);
      } else {
        let list = fetchedItems.filter((item) => item.parent_id === folderId);
        setItems(list.length ? list : null);
        const parent = fetchedItems.find((item) => item.id === folderId);
        setParentFolder(parent);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (error) {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_DATA");
      window.location.href = "/";
      setError(false);
    }
  }, [error]);

  useEffect(() => {
    fetchItems(currentFolder); // Fetch items based on the current folder
    console.log("items: ", items);
    console.log(user.id);

    console.log(currentFolder);
    console.log(parentFolder);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolder, menuPosition]);

  const sortedItems = useCallback(() => {
    const folders = items?.filter((item) =>
      item ? item.document_type === "folder" : null
    );
    const files = items?.filter((item) =>
      item ? item.document_type !== "folder" : null
    );

    // Optionally sort alphabetically (or any criteria)
    folders?.sort((a, b) => a.original_name.localeCompare(b.original_name));
    files?.sort((a, b) => a.original_name.localeCompare(b.original_name));

    return { folders, files };
  }, [items]);

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder.id); // Set the clicked folder as the current folder
    setOpenFolder(null);
    console.log(folder.id);
  };

  const { folders, files } = sortedItems();

  const handleDelete = async (e) => {
    console.log(folderSelected);

    if (folderSelected) {
      try {
        let response = await apiClient.delete(
          `/folder/delete/${folderSelected}`
        );
        setFolderSelected(null);
        setMenuPosition(null);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }

    if (docSelected) {
      try {
        let response = await apiClient.delete(`/doc/delete/${docSelected}`);
        setDocSelected(null);
        setMenuPosition(null);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
          <div className="p-11">
            {parentFolder?.parent_id ? (
              <button
                onClick={() => setCurrentFolder(parentFolder.parent_id)} // || null
                className="mb-4 p-2 bg-gray-300 rounded hover:bg-gray-600"
              >
                Go Back
              </button>
            ) : (
              ""
            )}
            <div className="flex flex-row flex-wrap">
              {folders?.map((folder) => (
                <div
                  className="cursor-pointer w-fit p-5"
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  onContextMenu={(e) => handleContextMenuFolder(e, folder)}
                >
                  <img
                    src={folderIcon}
                    alt="Folder Icon"
                    className="w-20 h-20"
                  />
                  <label className="flex justify-center items-center">
                    {folder.original_name}
                  </label>
                </div>
              ))}

              {files?.map((file) => (
                <div
                  className="cursor-pointer w-fit p-5"
                  key={file.id}
                  onClick={() => {
                    setOriginalName(file.original_name);
                    setFileName(file.file_name);
                    setPath(file.path);
                    setFile(true);
                    setExtension(file.extension);
                  }}
                  onContextMenu={(e) => handleContextMenuFile(e, file)}
                >
                  <Thumbnail file={file} />
                  <label className="block w-20 text-ellipsis overflow-hidden text-nowrap">
                    {file.original_name}
                  </label>
                </div>
              ))}

              {((!(items || folders) && !(items || files)) ||
                (items.length === 0)) && (<div>No files are present</div>)}
            </div>
          </div>
        </div>
      </div>
      <div></div>
      {modal && (
        <UploadFile
          openModal={modal}
          closeModal={() => {
            setModal(false);
            fetchItems(currentFolder);
          }}
          currentFolder={currentFolder ? currentFolder : rootId}
        />
      )}
      {dialog && (
        <CreateFolder
          openModal={dialog}
          closeModal={() => {
            setDialog(false);
            fetchItems(currentFolder);
          }}
          currentFolder={currentFolder ? currentFolder : rootId}
        />
      )}
      {file && (
        <ViewFile
          openModal={file}
          closeModal={() => setFile(false)}
          original_name={originalName}
          fileName={fileName}
          path={path}
          extension={extension}
        />
      )}
      {menuPosition && (
        <ul
          ref={menuRef}
          className="absolute bg-white border border-gray-300 rounded-md p-2 list-none shadow-md z-50"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <li
            onClick={handleDelete}
            className="bg-white hover:bg-slate-400 cursor-pointer"
          >
            Delete
          </li>
          {folderSelected ? (
            <li
              onClick={() => handleFolderClick(openFolder)}
              className="bg-white hover:bg-slate-400 cursor-pointer"
            >
              Open
            </li>
          ) : (
            <li
              onClick={() => {
                setOriginalName(showFile.original_name);
                setFileName(showFile.file_name);
                setPath(showFile.path);
                setFile(true);
                setMenuPosition(null);
              }}
              className="bg-white hover:bg-slate-400 cursor-pointer"
            >
              View
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default DocumentWindow;
