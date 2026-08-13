import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { extractResumeText } from "../../services/resumeService";
import ExtractedResume from "../resume/ExtractedResume";
import DetectedSkills from "../resume/DetectedSkills";
import ResumeStructure from "../resume/ResumeStructure";
import ResumeScore from "../analysis/ResumeScore";
import JobDescription from "../job/JobDescription";
import JobMatchResult from "../job/JobMatchResult";


const MAX_FILE_SIZE = 5 * 1024 * 1024;


function ResumeUpload() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [jobMatchResult, setJobMatchResult] = useState(null);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    if (!file) {
      return "Please select a file.";
    }

    if (file.type !== "application/pdf") {
      return "Only PDF files are supported.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "The PDF file must be smaller than 5 MB.";
    }

    return "";
  };

  const handleFile = (file) => {
    setError("");
    setResult(null);
    setJobMatchResult(null);

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setError(validationError);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setResult(null);
    setJobMatchResult(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF resume first.");
      return;
    }

    setIsUploading(true);
    setError("");
    setResult(null);
    setJobMatchResult(null);

    try {
      const data = await extractResumeText(selectedFile);

      setResult(data);
    } catch (uploadError) {
      console.error(uploadError);

      const message =
        uploadError.response?.data?.detail ||
        "Something went wrong while processing your resume.";

      setError(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleJobMatchComplete = (matchResult) => {
    setJobMatchResult(matchResult);
  };

  const resumeSkills = result
    ? Object.values(result.skills || {}).flat()
    : [];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Upload your resume
          </h2>

          <p className="mt-2 text-slate-400">
            Upload a PDF resume to begin your analysis.
          </p>
        </div>

        {/* Upload Area */}
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.02 : 1,
            borderColor: isDragging
              ? "rgb(99 102 241)"
              : "rgb(51 65 85)",
          }}
          transition={{
            duration: 0.2,
          }}
          className="relative rounded-2xl border-2 border-dashed bg-slate-900/70 p-10 text-center"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />

          <motion.div
            animate={{
              y: isDragging ? -5 : 0,
            }}
            className="flex flex-col items-center"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
              <Upload className="h-8 w-8 text-indigo-400" />
            </div>

            <p className="text-lg font-medium text-white">
              {isDragging
                ? "Drop your resume here"
                : "Drag & drop your resume"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              or
            </p>

            <button
              type="button"
              onClick={handleBrowse}
              className="mt-3 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Browse files
            </button>

            <p className="mt-4 text-xs text-slate-500">
              PDF only · Maximum 5 MB
            </p>
          </motion.div>
        </motion.div>

        {/* Selected File */}
        <AnimatePresence mode="wait">
          {selectedFile && (
            <motion.div
              key="selected-file"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                  <FileText className="h-6 w-6 text-indigo-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isUploading}
                  aria-label="Remove selected resume"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

              <p className="text-sm text-red-300">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Success */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

              <div>
                <p className="font-medium text-emerald-300">
                  Resume processed successfully
                </p>

                <p className="mt-1 text-sm text-emerald-400/80">
                  Extracted{" "}
                  {result.character_count.toLocaleString()}{" "}
                  characters from {result.filename}.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Process Button */}
        <motion.button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          whileHover={
            selectedFile && !isUploading
              ? {
                  scale: 1.01,
                }
              : {}
          }
          whileTap={
            selectedFile && !isUploading
              ? {
                  scale: 0.99,
                }
              : {}
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing resume...
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" />
              Process Resume
            </>
          )}
        </motion.button>

        {/* Resume Analysis */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="analysis-results"
              className="space-y-6"
            >
              <ResumeScore
                quality={result.quality}
              />

              <ExtractedResume
                filename={result.filename}
                text={result.text}
                characterCount={result.character_count}
              />

              <DetectedSkills
                skills={result.skills}
              />

              <ResumeStructure
                sections={result.sections}
              />

              {/* Job Matching */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="border-t border-slate-800 pt-8"
              >
                <div className="mb-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                    Next step
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Test your resume against a real job
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Paste a job description and ResumeIQ will
                    compare its requirements with your detected
                    skills.
                  </p>
                </div>

                <JobDescription
                  resumeSkills={resumeSkills}
                  onMatchComplete={
                    handleJobMatchComplete
                  }
                />
              </motion.div>

              {/* Job Match Result */}
              <AnimatePresence mode="wait">
                {jobMatchResult && (
                  <JobMatchResult
                    key="job-match-result"
                    result={jobMatchResult}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ResumeUpload;