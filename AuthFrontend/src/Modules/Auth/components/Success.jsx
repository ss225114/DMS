/* eslint-disable react/prop-types */

import { useRef, useEffect } from "react";

const Success = (props) => {
  const { open, close, data } = props;
  const ref = useRef();
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  let content;
  if (data) {
    content = (
      <p style={{ fontSize: 24, fontWeight: "bold", width: 300 }}>
        Your mail has been verified!
        <br />
        You&apos;re good to go!
      </p>
    );
  } else {
    content = (
      <p style={{ fontSize: 24, fontWeight: "bold", width: 300 }}>ERROR!</p>
    );
  }
  return (
    <>
      <dialog ref={ref} onCancel={close} className="modal">
        {content}
        <button onClick={close} className="bg-blue-600 text-white">
          OK
        </button>
      </dialog>
    </>
  );
};

export default Success;
