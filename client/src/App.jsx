// TwoStepLogin.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ShoppingBag, ChevronDown } from "lucide-react";
import logo from "./assets/dailycart-logo-main.png";

export default function TwoStepLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false); // 👈 New state for mobile

  const handleNext = (e) => {
    e.preventDefault();
    if (email.trim() !== "") setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    alert("Login clicked!");
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
    exit: { opacity: 0, x: -60, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-100 via-white to-orange-100">
      {/* Left Side Logo (desktop only) */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-white/30 backdrop-blur-sm p-6 lg:p-10">
        <motion.img
          src={logo}
          alt="DailyCart Logo"
          className="w-2/3 max-h-[60%] object-contain drop-shadow-lg mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
          transition={{
            duration: 1,
            ease: "easeOut",
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Tagline Section */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-700 text-lg lg:text-xl font-medium tracking-wide flex items-center justify-center gap-2 w-fit mx-auto"
        >
          <span className="text-[#264d78] animate-typing inline-block"> Fresh Choices, Better Prices </span>
          <motion.span
            animate={{ color: ["#22c55e", "#f97316", "#22c55e"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ShoppingBag size={28} />
          </motion.span>
        </motion.p>
      </div>

      {/* Right Side - Mobile & Form */}
      <div className="relative flex flex-1 flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-8 overflow-hidden">
        {/* Mobile First Screen (Logo + Tagline + Arrow) */}
        {!showForm && (
          <div className="md:hidden flex flex-col items-center mb-6 text-center">
            <motion.img
              src={logo}
              alt="DailyCart Logo"
              className="w-4/5 sm:w-2/3 max-w-[280px] object-contain drop-shadow-lg mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-700 text-lg sm:text-xl font-semibold tracking-wide flex items-center justify-center gap-2 leading-snug"
            >
              <span className="text-[#264d78] animate-typing inline-block">
                Fresh Choices, Better Prices
              </span>
              <motion.span
                animate={{ color: ["#22c55e", "#f97316", "#22c55e"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <ShoppingBag size={28} />
              </motion.span>
            </motion.p>

            {/* Down Arrow with Hint */}
            <motion.div
              className="mt-10 flex flex-col items-center cursor-pointer group"
              onClick={() => setShowForm(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {/* Arrow Icon */}
              <ChevronDown
                size={46}
                className="text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              />

              {/* Hint Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-base mt-2 animate-pulse"
              >
                Tap to continue
              </motion.p>
            </motion.div>
          </div>
        )}

        {/* Login Form (shown after arrow click on mobile OR always on desktop) */}
        {(showForm || window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[95%] sm:max-w-md lg:max-w-lg bg-white/90 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/40 z-10"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-5 font-sans tracking-tight">
              {step === 1 ? "Welcome to DailyCart 👋" : "Almost There 🚀"}
            </h2>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="step1"
                  onSubmit={handleNext}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                  >
                    {/* Email Input */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-gray-600 text-sm sm:text-base font-medium mb-1">
                        Enter your Email or Username
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-green-400 transition">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full outline-none text-gray-700 text-sm sm:text-base lg:text-lg placeholder-gray-400"
                          placeholder="example@dailycart.com"
                        />
                      </div>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
                      }}
                      variants={itemVariants}
                      type="submit"
                      className="w-full py-2 sm:py-3 lg:py-3.5 rounded-lg font-medium text-white text-sm sm:text-base lg:text-lg bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 transition-all"
                    >
                      Continue →
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  onSubmit={handleLogin}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                  >
                    {/* Password Input */}
                    <motion.div variants={itemVariants}>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2 break-words">
                        Logged in as{" "}
                        <span className="font-medium text-green-600">
                          {email}
                        </span>
                      </p>
                      <label className="block text-gray-600 text-sm sm:text-base font-medium mb-1">
                        Enter your Password
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-green-400 transition">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full outline-none text-gray-700 text-sm sm:text-base lg:text-lg placeholder-gray-400"
                          placeholder="••••••••"
                        />
                      </div>
                    </motion.div>

                    {/* Login Button */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
                      }}
                      variants={itemVariants}
                      type="submit"
                      className="w-full py-2 sm:py-3 lg:py-3.5 rounded-lg font-medium text-white text-sm sm:text-base lg:text-lg bg-gradient-to-r from-green-500 to-orange-400 hover:from-green-600 hover:to-orange-500 transition-all"
                    >
                      Login ✅
                    </motion.button>

                    {/* Back to Email */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      variants={itemVariants}
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-xs sm:text-sm lg:text-base text-green-600 hover:text-green-700 transition underline"
                    >
                      Use a different account
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
