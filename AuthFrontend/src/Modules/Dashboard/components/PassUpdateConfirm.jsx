/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PassUpdateConfirm = (props) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = props;
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);
  return (
    <dialog
      ref={ref}
      className="fixed top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-white rounded-lg shadow-md border-none overflow-hidden animate-fade-in backdrop:bg-black/50 backdrop:animate-backdrop-fade-in flex flex-col gap-5 p-5"
    >
      <strong>Password updated</strong>
      <button
        onClick={() => {
          closeModal();
          navigate("/");
        }}
        className="bg-blue-600 text-white"
      >
        OK
      </button>
    </dialog>
  );
};

export default PassUpdateConfirm;
