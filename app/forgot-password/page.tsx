"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Always show the same message for security
      setSubmitted(true);
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-2 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-8 mx-auto"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-gray-500">S</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Forgot Password</h2>
        </div>
        {submitted ? (
          <div className="text-center text-gray-700 text-base sm:text-lg">
            If that email is registered, a reset link has been sent.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-gray-700">
                Enter your email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all text-lg disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage; 