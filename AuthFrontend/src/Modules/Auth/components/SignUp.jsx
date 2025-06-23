/* eslint-disable no-unused-vars */
import "../styles/StyleSignUp.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Verification from "./Verification";

const SignUp = () => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleName = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, name: e.target.value }));
    console.log(user.name);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, email: e.target.value }));
    console.log(user.email);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, username: e.target.value }));
    console.log(user.username);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, password: e.target.value }));
    console.log(user.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://dms.wishalpha.com/api/auth/register", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.reponse);
      });
  };

  return (
    <>
      <div className="mt-24 flex justify-center items-center">
        <div className="container" id="container">
          <motion.div
            initial={{ x: -200, opacity: 0, zIndex: 1 }}
            animate={{ x: 380, opacity: 1, zIndex: 5 }}
            transition={{ delay: 1 }}
            className="form_container sign-up"
          >
            <form onSubmit={handleSubmit} method="POST">
              <h1>Create an Account</h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleName}
                id="name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                onChange={handleEmail}
                id="email"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleUsername}
                id="username"
              />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handlePassword}
                id="password"
              />
              <button type="submit" onClick={() => setModal(true)}>
                Sign Up
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -385 }}
            className="toggle_container"
          >
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <motion.h1
                  initial={{ x: -100, opacity: 0, zIndex: 0 }}
                  animate={{ x: 385, opacity: 1, zIndex: 10 }}
                  transition={{ delay: 1.8 }}
                >
                  Hello User!
                </motion.h1>
                <motion.p
                  initial={{ x: -100, opacity: 0, zIndex: 0 }}
                  animate={{ x: 385, opacity: 1, zIndex: 10 }}
                  transition={{ delay: 1.8 }}
                >
                  Already have an account?
                </motion.p>
                <motion.button
                  initial={{ x: -100, opacity: 0, zIndex: 0 }}
                  animate={{ x: 385, opacity: 1, zIndex: 10 }}
                  transition={{ delay: 1.8 }}
                  type="button"
                  id="signin-btn"
                >
                  <Link to="/login">SIGN IN</Link>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {modal && <Verification openModal={modal} closeModal={() => setModal(false)} />}
    </>
  );
};

export default SignUp;
