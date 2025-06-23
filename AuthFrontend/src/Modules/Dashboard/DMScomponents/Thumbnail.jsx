/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ImageIcon from "@/assets/images/image_icon.png";
import pdfIcon from "@/assets/images/pdf.png";

const Thumbnail = ({ file }) => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 500);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <>
      {showImage && file?.file_name && (
        file.extension === "pdf" ? (
          <img
          src={pdfIcon}
          className="w-20 h-20"
        />
        ) : (
          <img
          src={`https://dms.wishalpha.com/thumbnails/${file.file_name}`}
          alt={ImageIcon}
          className="w-20 h-20"
        />
        )
      )}
    </>
  );
};

export default Thumbnail;
