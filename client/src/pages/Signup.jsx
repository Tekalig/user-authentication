import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { UserRoundPen, Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../store/AuthStore";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, error, isLoading } = AuthStore();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.username
      );
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-transparent">
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            icon={UserRoundPen}
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Input
            icon={Lock}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

          {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 p-3 rounded-md font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className=" animate-spin mx-auto" size={16} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="flex justify-center items-center bg-gray-900 bg-opacity-50 p-4 text-gray-400 text-sm">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-green-400 hover:text-emerald-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Signup;
