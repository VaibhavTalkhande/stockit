"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or missing reset link.");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        toast.success("Password has been reset successfully. You can now log in.");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Reset Password</h2>
          <span className="text-2xl font-bold text-gray-500">{email}</span>
        </div>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        {success ? (
          <div className="text-center text-green-600 text-base sm:text-lg">
            Password reset successful! Redirecting to login...
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium text-gray-700">
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 text-base sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all text-lg disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage; 