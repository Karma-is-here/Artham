import { useState } from "react";

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string) => void;
  onBackToLanding: () => void;
  onGoToSignin: () => void;
}

export function SignupPage({ onSignup, onBackToLanding, onGoToSignin }: SignupPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    onSignup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C8B82]/10 via-white to-[#F4B400]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBackToLanding}
          className="mb-4 flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 12L6 8L10 4" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="text-center pt-8 px-8 pb-6 space-y-4">
            <div className="mx-auto bg-gradient-to-br from-[#1C8B82] to-[#148B7F] p-3 rounded-2xl w-fit">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-slate-900">Create your account</h2>
              <p className="text-slate-600 mt-2">
                Start your journey to financial clarity
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="block text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-slate-400"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C8B82] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-slate-400"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C8B82] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-slate-400"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C8B82] focus:border-transparent"
                    required
                  />
                </div>
                <p className="text-slate-500">Must be at least 6 characters</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="block text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-slate-400"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C8B82] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 rounded-lg bg-[#1C8B82] hover:bg-[#157670] text-white transition-colors"
              >
                Create Account
              </button>

              <div className="text-center pt-4">
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onGoToSignin}
                    className="text-[#1C8B82] hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-slate-500 mt-6">
          🔒 Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}
