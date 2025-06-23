import "../styles/StyleSignIn.css";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const SignIn = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(0);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const handleUsername = (e) => {
    e.preventDefault();
    setLogin((prev) => ({ ...prev, username: e.target.value }));
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setLogin((prev) => ({ ...prev, password: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://dms.wishalpha.com/api/auth/login", login)
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data.data);
        console.log("Set all data");
        console.log(res.data.data);
        navigate("/");
      })
      .catch((err) => {
        setErrMsg(1);
        console.log(err);
      });
  };
  return (
    <>
      <div className="mt-24 flex justify-center items-center">
        <div className="container" id="container">
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="form_container sign-in"
          >
            <form onSubmit={handleSubmit} action="post">
              <h1 className="text-2xl font-serif">Sign In</h1>
              {errMsg ? (
                <div className="bg-red-100 p-2 text-red-950 w-full text-sm">Invalid credentials</div>
              ) : null}
              <input
                type="text"
                placeholder="Username"
                onChange={handleUsername}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handlePassword}
              />
              <Link
                to="/forgot-password"
                className="underline text-violet-900 cursor-pointer"
              >
                Forgot password?
              </Link>
              <button type="submit">Sign In</button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            className="toggle_container"
          >
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <motion.h1
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  Hello friend!
                </motion.h1>
                <motion.p
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  Sign up for free
                </motion.p>
                <motion.button
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  type="button"
                  id="signup-btn"
                >
                  <Link to="/registration">SIGN UP</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
