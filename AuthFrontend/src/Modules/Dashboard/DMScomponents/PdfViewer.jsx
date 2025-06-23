/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const PdfViewer = (props) => {
  const { openModal, closeModal, original_name, fileName, path } = props;





  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    console.log(path);
    console.log("URL:", `http://localhost:8080${path}`);
  }, [openModal, path]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <dialog
        ref={ref}
        className="fixed top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[90%] bg-transparent border-none overflow-hidden animate-fade-in backdrop:bg-black/50 backdrop:animate-backdrop-fade-in"
      >
        <Document file={`http://localhost:8080${path}`} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <div className="flex flex-row justify-around ">
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages))
              }
            >
              Next
            </button>
            <button onClick={closeModal} className="px-4 py-2 text-sm rounded-md hover:bg-gray-200">Close</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PdfViewer;
