/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "../styles/StyleDialog.css";
import axios from "axios";
import OtpLogin02 from "./OtpLogin02";

const OtpLogin01 = (props) => {
  const { openModal, closeModal } = props;
  const ref = useRef();
  const [otp, setOtp] = useState();
  const [modal, setModal] = useState(false);
  const [mail, setMail] = useState("");
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const handleEmail = (e) => {
    e.preventDefault();
    setMail(e.target.value);
    console.log(mail);

    // setMail((prev)=>({...prev, email:e.target.value }));
  };

  const handleInput = async (mail) => {
    try {
      console.log("Email being sent:", mail);
      const response = await axios.put(
        "https://dms.wishalpha.com/api/auth/forgot-password",
        null,
        {
          params: { email: mail }, // 'email' should match the @RequestParam in your backend
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <dialog ref={ref} onCancel={closeModal} className="modal overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission from refreshing the page
            handleInput(mail); // Pass the 'mail' state to handleInput
          }}
          id="otp-login-form"
          method="post"
        >
          <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Login with OTP</h1>

          <input
            className="h-7 pl-3"
            name="email"
            type="text"
            placeholder="Enter your mail id"
            onChange={handleEmail}
          />

          <div id="link">Resend OTP</div>
          <button
            type="submit"
            onClick={() => setModal(true)}
            className="bg-blue-600 text-white"
          >
            Send OTP
          </button>
        </form>
      </dialog>
      {modal && <OtpLogin02 open={modal} close={() => setModal(false)} data={mail}/>}
    </>
  );
};

export default OtpLogin01;
