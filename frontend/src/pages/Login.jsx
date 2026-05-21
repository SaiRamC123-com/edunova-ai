import { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {

      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Account Created");
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Login Successful");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-full max-w-md"
      >

        <h1 className="text-4xl font-bold text-center mb-8">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <div className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleAuth}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-lg font-semibold"
          >
            {isSignup ? "Sign Up" : "Login"}
          </motion.button>

          <p
            className="text-center text-gray-400 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account?"
              : "Create new account"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;