/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../styles/StyleDialog.css"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const OtpLogin02 = (props) => {
  const navigate = useNavigate();
  const { open, close, data } = props;
  const { setUser, setToken } = useAuth();
  const [otp, setOtp] = useState("");
  const [ loginData, setLoginData ] = useState({
    email: data,
    otp: "",
  });
  const ref = useRef();
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    console.log(data);
  }, [open, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);

    axios
      .post("https://dms.wishalpha.com/api/auth/forgot-password/login", loginData)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.data);
        setToken(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.reponse);
      });

    ref.current?.close();
    
  };

  const handleOtpChange = (otpValue) => {
    // Update the OTP state
    setOtp(otpValue);

    // Update the verification data with the OTP
    setLoginData((prev) => ({ ...prev, otp: otpValue }));
  };
  return (
    <>
      <dialog ref={ref} onCancel={close} className="modal">
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Login with OTP</h1>
        <p>OTP has been sent to your mail. Please enter the OTP to login.</p>
        <form onSubmit={handleSubmit} action="post" className="flex flex-col justify-center items-center gap-3">
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
          <button type="submit" className="bg-blue-600 text-white">Login</button>
        </form>
      </dialog>
    </>
  );
};

export default OtpLogin02;
