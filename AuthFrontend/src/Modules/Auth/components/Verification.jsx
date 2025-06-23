/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "../styles/StyleDialog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Success from "./Success";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const Verification = (props) => {
  const { openModal, closeModal } = props;

  const [success, setSuccess] = useState(false);

  const ref = useRef();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [verificationData, setVerificationData] = useState({
    email: "",
    otp: "",
  });
  // const otpContext = useContext(OTPInputContext);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const handleEmail = (e) => {
    e.preventDefault();
    setVerificationData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleOtpChange = (otpValue) => {
    // Update the OTP state
    setOtp(otpValue);

    // Update the verification data with the OTP
    setVerificationData((prev) => ({ ...prev, otp: otpValue }));
  };


  const handleVerification = (e) => {
    e.preventDefault();
    console.log(verificationData);

    axios
      .put("https://dms.wishalpha.com/api/auth/verify-account", verificationData)
      .then((res) => {
        console.log(res.data);
        setSuccess(true)
        console.log(success);
        
        // navigate("/login/sign-in");
      })
      .catch((err) => {
        console.log(err.reponse);
      });

    ref.current?.close();
  };

  return (
    <>
      <dialog ref={ref} onCancel={closeModal} className="modal">
        <form
          onSubmit={handleVerification}
          id="verification-form"
          method="post"
        >
          <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
            Verify Your Email...
          </h1>
          <p>
            An OTP has been sent to your mail. Please enter the OTP to complete
            the verification.
          </p>

          <input
            name="email"
            type="text"
            placeholder="Enter your mail id"
            onChange={handleEmail}
          />
          <InputOTP maxLength={6} onChange={handleOtpChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div id="link">Resend OTP</div>
          <button type="submit" onClick={() => setModal(true)} className="bg-blue-600 text-white">
            Verify
          </button>
        </form>
      </dialog>
      {modal && <Success open={modal} close={() => {setModal(false); navigate("/login")}} data={success}/>}
    </>
  );
};

export default Verification;
