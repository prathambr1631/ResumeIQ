import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  FileText,
  Loader2,
  ScanLine,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";

import JobRecommendations from "../job/JobRecommendations";

import { extractResumeText } from "../../services/resumeService";
import ExtractedResume from "../resume/ExtractedResume";
import DetectedSkills from "../resume/DetectedSkills";
import ResumeStructure from "../resume/ResumeStructure";
import ResumeScore from "../analysis/ResumeScore";
import JobDescription from "../job/JobDescription";
import JobMatchResult from "../job/JobMatchResult";


const MAX_FILE_SIZE = 5 * 1024 * 1024;


const scannerSteps = [
  "Reading document",
  "Extracting content",
  "Understanding resume",
];


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
          duration: 0.6,
        }}
        className="space-y-7"
      >

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="text-center">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/15 bg-blue-400/[0.06]"
          >
            <BrainCircuit
              className="h-6 w-6 text-blue-300"
              strokeWidth={1.5}
            />
          </motion.div>


          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            Start with your resume
          </h2>


          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Upload your resume and let ResumeIQ analyze its
            structure, skills, quality, and career potential.
          </p>

        </div>


        {/* =====================================================
            SCANNER
        ====================================================== */}

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.015 : 1,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`relative overflow-hidden rounded-[28px] border ${
            isDragging
              ? "border-blue-400/60 bg-blue-500/[0.08]"
              : "border-white/[0.08] bg-[#081322]"
          }`}
        >

          {/* Scanner glow */}
          <motion.div
            animate={{
              opacity: isDragging
                ? [0.25, 0.5, 0.25]
                : [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]"
          />


          {/* Technical corner decorations */}
          <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-blue-400/20" />

          <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-blue-400/20" />

          <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-blue-400/20" />

          <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-blue-400/20" />


          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />


          <div className="relative px-6 py-12 text-center sm:px-10 sm:py-16">

            {/* Animated document */}
            <motion.div
              animate={{
                y: isDragging
                  ? -10
                  : [0, -5, 0],
                rotate: isDragging
                  ? 0
                  : [-1, 1, -1],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative mx-auto mb-8 flex h-24 w-20 items-center justify-center"
            >

              {/* Document glow */}
              <motion.div
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl"
              />

              {/* Document */}
              <div className="relative h-24 w-20 rounded-xl border border-blue-300/20 bg-gradient-to-br from-blue-400/[0.12] to-cyan-400/[0.04] shadow-xl shadow-blue-900/20">

                <FileText
                  className="absolute left-1/2 top-5 h-8 w-8 -translate-x-1/2 text-blue-300"
                  strokeWidth={1.2}
                />

                <div className="absolute bottom-5 left-4 right-4 space-y-1.5">
                  <span className="block h-1 rounded-full bg-blue-300/20" />
                  <span className="block h-1 w-4/5 rounded-full bg-blue-300/15" />
                  <span className="block h-1 w-3/5 rounded-full bg-blue-300/10" />
                </div>

              </div>


              {/* Scan beam */}
              <motion.div
                animate={{
                  y: [-34, 34, -34],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[-8px] right-[-8px] h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              />

            </motion.div>


            {/* Main text */}
            <AnimatePresence mode="wait">

              <motion.div
                key={isDragging ? "dragging" : "default"}
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
              >

                <h3 className="text-xl font-semibold text-slate-100">
                  {isDragging
                    ? "Release to scan your resume"
                    : "Drop your resume here"}
                </h3>


                <p className="mt-2 text-sm text-slate-500">
                  {isDragging
                    ? "ResumeIQ is ready to analyze your PDF"
                    : "Drag & drop your PDF or choose a file"}
                </p>

              </motion.div>

            </AnimatePresence>


            {/* Browse button */}
            <motion.button
              type="button"
              onClick={handleBrowse}
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-200 shadow-lg shadow-blue-900/10 transition hover:border-blue-300/30 hover:bg-blue-500/15"
            >

              <Upload
                className="h-4 w-4"
                strokeWidth={1.8}
              />

              Choose PDF

            </motion.button>


            {/* Metadata */}
            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-slate-600">

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/60" />
                PDF supported
              </span>

              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-blue-400/60" />
                AI analysis
              </span>

              <span className="flex items-center gap-1.5">
                <FileSearch className="h-3.5 w-3.5 text-cyan-400/60" />
                Max 5 MB
              </span>

            </div>

          </div>

        </motion.div>


        {/* =====================================================
            SELECTED FILE
        ====================================================== */}

        <AnimatePresence mode="wait">

          {selectedFile && !result && (

            <motion.div
              key="selected-file"
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.98,
              }}
              className="relative overflow-hidden rounded-2xl border border-blue-400/10 bg-[#081322] p-5"
            >

              {/* Progress-like glow */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
              />


              <div className="flex items-center gap-4">

                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/[0.06]">

                  <FileText
                    className="h-6 w-6 text-blue-300"
                    strokeWidth={1.5}
                  />

                </div>


                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-medium text-slate-200">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    {" · "}
                    PDF ready for analysis
                  </p>

                </div>


                <motion.button
                  type="button"
                  onClick={handleRemove}
                  disabled={isUploading}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  aria-label="Remove selected resume"
                  className="rounded-xl border border-white/[0.05] p-2 text-slate-500 transition hover:border-red-400/10 hover:bg-red-400/[0.05] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <X className="h-4 w-4" />

                </motion.button>

              </div>

            </motion.div>

          )}

        </AnimatePresence>


        {/* =====================================================
            PROCESS BUTTON / SCANNING STATE
        ====================================================== */}

        <AnimatePresence mode="wait">

          {selectedFile && !result && (

            <motion.div
              key="process-area"
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
            >

              <motion.button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                whileHover={
                  !isUploading
                    ? {
                        scale: 1.01,
                      }
                    : {}
                }
                whileTap={
                  !isUploading
                    ? {
                        scale: 0.985,
                      }
                    : {}
                }
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-blue-400/20 bg-blue-500/10 px-5 py-4 font-medium text-blue-100 transition hover:border-blue-300/30 hover:bg-blue-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {/* Button shine */}
                {!isUploading && (
                  <motion.span
                    animate={{
                      x: ["-120%", "120%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute inset-y-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                  />
                )}


                {isUploading ? (
                  <>
                    <div className="relative flex h-6 w-6 items-center justify-center">

                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full border border-blue-300/20 border-t-cyan-300"
                      />

                      <ScanLine className="h-3.5 w-3.5 text-cyan-300" />

                    </div>

                    <span>
                      ResumeIQ is analyzing your resume...
                    </span>
                  </>
                ) : (
                  <>
                    <BrainCircuit
                      className="h-5 w-5 text-blue-300"
                      strokeWidth={1.5}
                    />

                    <span>
                      Analyze Resume with AI
                    </span>

                    <Sparkles className="h-4 w-4 text-cyan-300" />
                  </>
                )}

              </motion.button>


              {/* Processing sequence */}
              <AnimatePresence>

                {isUploading && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="mt-4 overflow-hidden"
                  >

                    <div className="rounded-2xl border border-blue-400/10 bg-blue-400/[0.025] p-4">

                      <div className="grid gap-3 sm:grid-cols-3">

                        {scannerSteps.map(
                          (step, index) => (
                            <motion.div
                              key={step}
                              initial={{
                                opacity: 0.25,
                              }}
                              animate={{
                                opacity: [0.3, 1, 0.3],
                              }}
                              transition={{
                                duration: 1.5,
                                delay: index * 0.45,
                                repeat: Infinity,
                              }}
                              className="flex items-center gap-2"
                            >

                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                              <span className="text-xs text-slate-500">
                                {step}
                              </span>

                            </motion.div>
                          )
                        )}

                      </div>

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          )}

        </AnimatePresence>


        {/* =====================================================
            ERROR
        ====================================================== */}

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
              className="flex items-start gap-3 rounded-2xl border border-red-400/10 bg-red-500/[0.06] p-4"
              role="alert"
            >

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-400/[0.08]">

                <AlertCircle className="h-4 w-4 text-red-400" />

              </div>


              <div>

                <p className="text-sm font-medium text-red-300">
                  Resume analysis failed
                </p>

                <p className="mt-1 text-sm leading-6 text-red-300/70">
                  {error}
                </p>

              </div>

            </motion.div>

          )}

        </AnimatePresence>


        {/* =====================================================
            SUCCESS
        ====================================================== */}

        <AnimatePresence>

          {result && (

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className="relative overflow-hidden rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-5"
              role="status"
            >

              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
              />


              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/[0.08]">

                  <CheckCircle2
                    className="h-5 w-5 text-emerald-400"
                    strokeWidth={1.7}
                  />

                </div>


                <div>

                  <p className="font-medium text-emerald-300">
                    Resume intelligence complete
                  </p>

                  <p className="mt-1 text-sm leading-6 text-emerald-400/70">
                    ResumeIQ extracted{" "}
                    {result.character_count.toLocaleString()}{" "}
                    characters from {result.filename}.
                  </p>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>


        {/* =====================================================
            ANALYSIS RESULTS
        ====================================================== */}

        <AnimatePresence mode="wait">

          {result && (

            <motion.div
              key="analysis-results"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
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
                className="border-t border-white/[0.07] pt-8"
              >

                <div className="mb-6">

                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-400">

                    <TargetIcon />

                    Next analysis

                  </div>


                  <h3 className="mt-2 text-xl font-semibold text-slate-100">
                    Test your resume against a real job
                  </h3>


                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Paste a job description and ResumeIQ will
                    compare its requirements with the skills
                    detected in your resume.
                  </p>

                </div>


                <JobDescription
                  resumeText={result.text}
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


                {jobMatchResult && (
                  <JobRecommendations
                    key="job-recommendations"
                    recommendations={
                      jobMatchResult.recommendations
                    }
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


/*
 * Small local icon wrapper.
 * Keeping it here avoids introducing another dependency.
 */
function TargetIcon() {
  return (
    <motion.span
      animate={{
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="inline-flex"
    >
      <Zap
        className="h-3.5 w-3.5"
        strokeWidth={1.7}
      />
    </motion.span>
  );
}


export default ResumeUpload;