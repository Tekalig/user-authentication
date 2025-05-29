import { motion } from "framer-motion";
import AuthStore from "../store/AuthStore";
import { format } from "date-fns";

function Home() {
  const { user } = AuthStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-transparent">
          Dashboard
        </h1>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start flex-col space-y-2 mt-6 bg-slate-700 rounded-md p-4"
          >
            <h1 className="text-2xl font-bold text-center text-white">
              Profile Details
            </h1>
            <p className="font-bold text-white">Full Name: {user?.userName}</p>
            <p className="font-bold text-white">Email: {user?.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-start mt-6 flex-col space-y-2 bg-slate-700 rounded-md p-4"
          >
            <h1 className="text-2xl font-bold text-center text-white">
              Account Details
            </h1>
            <p className="font-bold text-white">
              Account Created:{" "}
              {user?.createdAt ? format(new Date(user.createdAt), "PPpp") : ""}
            </p>
            <p className="font-bold text-white">
              Account Updated:{" "}
              {user?.updatedAt ? format(new Date(user.updatedAt), "PPpp") : ""}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-red-400 to-red-500 rounded-md py-2 px-4 text-white font-bold"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
