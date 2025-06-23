/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import cross from "@/assets/images/cross.png";
import PdfViewer from "./PdfViewer";

const ViewFile = (props) => {
  const { openModal, closeModal, original_name, fileName, path, extension } = props;
  // const image_path = "C:\\Users\\91700\\OneDrive\\Desktop\\Java_Projects\\authentication\\"+path
  const ref = useRef();
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    console.log(path);
    console.log("Image URL:", `https://dms.wishalpha.com${path}`);
  }, [openModal, path]);

  return (
    <>
     {extension === "pdf" ? (
      <div>
        <PdfViewer
        openModal={openModal}
        closeModal={closeModal}
        original_name={original_name}
        fileName={fileName}
        path={path}
         />
      </div>) : (
       <dialog
        ref={ref}
        onCancel={closeModal}
        className="fixed top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-transparent border-none overflow-hidden animate-fade-in backdrop:bg-black/50 backdrop:animate-backdrop-fade-in"
      >
        <div className="flex flex-col justify-center items-center p-3 gap-5">
          <div className="flex flex-row-reverse items-end w-2/3">
            <button
              onClick={closeModal}
              className="h-8 w-8 rounded-2xl bg-slate-100 hover:bg-slate-200 p-1 flex items-center justify-center"
            >
              <img src={cross} />
            </button>
          </div>
          <img
            src={`https://dms.wishalpha.com/documents/${fileName}`}
            alt="image"
            className="w-1/2 h-1/2"
          />
          <h2 className="text-white text-xl">{original_name}</h2>
        </div>
      </dialog>
     )}
    </>
  );
};

export default ViewFile;

// C:\Users\91700\OneDrive\Desktop\Java_Projects\authentication\src\main\resources\static\documents\1732688842302Screenshot 2023-08-05 182155.png
