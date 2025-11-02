import { useState } from "react";

interface BankStatementSectionProps {
  csvUploaded: boolean;
  onUpload: () => void;
}

export function BankStatementSection({ csvUploaded, onUpload }: BankStatementSectionProps) {
  const [consent, setConsent] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!consent) {
      setError("Please provide consent before uploading");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setTimeout(() => {
      onUpload();
      setUploading(false);
    }, 1200);
  };

  const handleUseSampleData = () => {
    if (!consent) {
      setError("Please provide consent before proceeding");
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 100);

    setTimeout(() => {
      onUpload();
      setUploading(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h3 className="text-slate-900">Upload your bank statement 📄</h3>
          <div className="group relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400 cursor-help"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <div className="hidden group-hover:block absolute left-0 top-6 w-64 p-3 bg-slate-900 text-white text-sm rounded-lg shadow-lg z-10">
              Artham reads your statement securely to detect spending patterns.
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {/* Consent Box */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1C8B82] focus:ring-[#1C8B82]"
            />
            <div className="flex-1">
              <label htmlFor="consent" className="cursor-pointer text-slate-700">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline mr-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                By ticking this box, I allow Artham to read my uploaded bank statements and
                generate personalized insights for me.
              </label>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-amber-800">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <p className="text-sm">
              We only read transaction data — never your passwords or sensitive info.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        {!csvUploaded && !uploading && (
          <div className="space-y-3">
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                consent
                  ? "border-[#1C8B82] bg-[#1C8B82]/5 hover:bg-[#1C8B82]/10"
                  : "border-slate-300 bg-slate-50 cursor-not-allowed"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={consent ? "#1C8B82" : "#94a3b8"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="mb-2 text-slate-700">
                  <span>Click to upload</span> or drag and drop
                </p>
                <p className="text-slate-500">CSV files only</p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
                disabled={!consent}
              />
            </label>

            <div className="text-center">
              <p className="text-slate-500 mb-2">or</p>
              <button
                onClick={handleUseSampleData}
                disabled={!consent}
                className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 mx-auto ${
                  consent
                    ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                    : "border-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                Use Sample Data (for demo)
              </button>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
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
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
              <p className="text-slate-700">Parsing your data...</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-[#1C8B82] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success State */}
        {csvUploaded && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            <div className="flex-1">
              <p className="text-green-900">Bank statement uploaded successfully!</p>
              <p className="text-green-700">Your transaction data has been analyzed.</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <p className="text-red-900">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
