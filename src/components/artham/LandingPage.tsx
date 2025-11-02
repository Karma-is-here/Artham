interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  isReturningUser: boolean;
}

export function LandingPage({ onGetStarted, onLogin, isReturningUser }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-[#1C8B82] to-[#148B7F] p-2 rounded-xl">
                <svg
                  width="24"
                  height="24"
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
              <span className="text-slate-900" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                Artham
              </span>
            </div>
            <button
              onClick={onLogin}
              className="text-slate-700 hover:text-[#1C8B82] px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 style={{ fontSize: "3.25rem", fontWeight: 800, fontFamily: "Inter, system-ui" }}>
                  Make your money make <span style={{ color: "#1C8B82", fontStyle: "italic", fontWeight: 900 }}>$ense</span>.
                </h1>
                <p className="text-slate-600 text-xl md:text-2xl">
                  Learn through your real-life money, not lectures.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-3 rounded-lg bg-[#1C8B82] hover:bg-[#157670] text-white transition-colors flex items-center justify-center gap-2"
                >
                  {isReturningUser ? "Go to Dashboard" : "Start Reflecting"}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
                
                {!isReturningUser && (
                  <button
                    onClick={onLogin}
                    className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Already have an account? Log in
                  </button>
                )}
              </div>

              {/* Features */}
              <div className="pt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1C8B82]/10 rounded-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1C8B82"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900">Secure & Private</p>
                    <p className="text-slate-600">Your data stays yours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#F4B400]/10 rounded-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4B400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 12-4-4v3H4v2h14v3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-900">AI-Powered</p>
                    <p className="text-slate-600">Smart insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-[#1C8B82]/5 to-[#F4B400]/5 rounded-3xl p-8 lg:p-12">
                <img
                  src="https://images.unsplash.com/photo-1723443956765-fdc2100ec80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGglMjBjb2luc3xlbnwxfHx8fDE3NjE3NzIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Financial growth"
                  className="w-full rounded-2xl shadow-2xl"
                />
                
                {/* Floating Vault Cards */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1C8B82"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                    <div>
                      <p className="text-slate-600">Spend</p>
                      <p className="text-slate-900">Daily essentials</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F4B400"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                      <path d="M16 11h0" />
                    </svg>
                    <div>
                      <p className="text-slate-600">Save</p>
                      <p className="text-slate-900">Short-term goals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 border-t border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-slate-900 mb-4">Four vaults. One clear picture.</h2>
            <p className="text-slate-600 text-xl">
              Artham automatically organizes your money into four intelligent vaults
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#1C8B82]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C8B82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <h3 className="text-slate-900 mb-2">Spend 💸</h3>
              <p className="text-slate-600">
                Daily use & bills. Your lifestyle expenses, tracked and understood.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F4B400]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B400"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                  <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                  <path d="M16 11h0" />
                </svg>
              </div>
              <h3 className="text-slate-900 mb-2">Save 💰</h3>
              <p className="text-slate-600">
                Short-term savings. Building your buffer for upcoming goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#1C8B82]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1C8B82"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 12-4-4v3H4v2h14v3z" />
                </svg>
              </div>
              <h3 className="text-slate-900 mb-2">Grow 📈</h3>
              <p className="text-slate-600">
                Investments. Making your money work harder for your future.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F4B400]/10 rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F4B400"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-slate-900 mb-2">Protect 🛡️</h3>
              <p className="text-slate-600">
                Emergency & insurance. Your safety net for life's surprises.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600">
              🔒 Your privacy is protected. We never share your financial data.
            </p>
            <p className="text-slate-500">
              Powered by Artham AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
