import { useState } from "react";
import OtpLogin01 from "./OtpLogin01";

const Recovery = () => {
    const [modal, setModal] = useState(false);
    const login = () => {
      setModal(true);
    };
  return (
    <>
      <div className="p-5 flex justify-center items-center h-screen bg-blue-200">
      <div className="p-28 flex flex-col gap-8 w-fit h-fit shadow-2xl bg-white">
        <h1 className="text-4xl text-blue-500">FORGOT PASSWORD</h1>
        <ul className="flex flex-col gap-4">
          <li className="text-gray-500 hover:text-gray-950 cursor-pointer w-fit text-lg" onClick={() =>{login()}}>Login with OTP</li>
          <span className="text-gray-400">An otp will be sent to your mail using which you can login into your account</span>
          
        </ul>
      </div>
      {modal && <OtpLogin01 openModal={modal} closeModal={() => setModal(false)}/>}
      </div>
    </>
  );
};

export default Recovery;
