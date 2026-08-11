import { useEffect, useState } from "react";
import { checkBackendHealth } from "./services/api";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await checkBackendHealth();

        setBackendStatus(
          `${data.service} — ${data.status}`
        );
      } catch (err) {
        console.error(err);
        setBackendStatus("Backend unavailable");
        setError("Could not connect to the FastAPI backend.");
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          ResumeIQ
        </h1>

        <p className="text-slate-400 mb-6">
          Frontend ↔ Backend Connection Test
        </p>

        <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-4">
          <p className="text-sm text-slate-400 mb-2">
            Backend Status
          </p>

          <p className="text-lg font-semibold">
            {backendStatus}
          </p>

          {error && (
            <p className="text-red-400 text-sm mt-3">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;