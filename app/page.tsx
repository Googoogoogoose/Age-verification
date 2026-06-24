"use client";

export default function AgeVerification() {
  const handleYes = () => {
    window.location.href = "https://t.me/+540P0M9xabNmZTli";
  };

  const handleNo = () => {
    window.location.href = "https://google.com";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 text-center shadow-2xl border border-zinc-800">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Age Verification
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            This website contains age-restricted content. By entering, you confirm that you are at least 18 years old.
          </p>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
          <p className="text-white font-medium">
            Are you 18 years or older?
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleYes}
            className="flex-1 py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            Yes, I am 18+
          </button>
          <button
            onClick={handleNo}
            className="flex-1 py-3 px-6 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            No, Exit
          </button>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          By clicking &quot;Yes&quot;, you agree to our Terms of Service and confirm you are of legal age.
        </p>
      </div>
    </div>
  );
}
