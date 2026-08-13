import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Clipboard,
  FileText,
} from "lucide-react";


function ExtractedResume({ filename, text, characterCount }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy resume text:", error);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl shadow-black/10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Resume extracted
            </h3>

            <p className="mt-1 max-w-md truncate text-sm text-slate-400">
              {filename}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              Copy text
            </>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 border-b border-slate-800">
        <div className="border-r border-slate-800 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Characters
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {characterCount.toLocaleString()}
          </p>
        </div>

        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Status
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <p className="text-sm font-medium text-emerald-400">
              Ready for analysis
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Text */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-400" />

          <h4 className="text-sm font-medium text-slate-300">
            Extracted content
          </h4>
        </div>

        <div className="max-h-[420px] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-300">
            {text}
          </pre>
        </div>
      </div>
    </motion.section>
  );
}

export default ExtractedResume;