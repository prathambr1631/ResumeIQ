import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness,
  ClipboardPaste,
  RotateCcw,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { matchJob } from "../../services/jobService";


const MAX_CHARACTERS = 10000;

const EXAMPLE_JOB_DESCRIPTION = `Machine Learning Intern

We are looking for a motivated AI/ML intern to join our engineering team.

Requirements:
- Strong Python programming skills
- Experience with NumPy and Pandas
- Knowledge of Machine Learning and Scikit-learn
- SQL and database fundamentals
- Familiarity with Git and Docker
- Understanding of data preprocessing and model evaluation
- Good problem-solving and communication skills`;


function JobDescription({
  resumeText = "",
  resumeSkills = [],
  onMatchComplete,
}) {
  const [jobDescription, setJobDescription] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;

    if (value.length <= MAX_CHARACTERS) {
      setJobDescription(value);
      setError("");
    }
  };

  const handleExample = () => {
    setJobDescription(EXAMPLE_JOB_DESCRIPTION);
    setError("");
  };

  const handleClear = () => {
    setJobDescription("");
    setError("");
  };

  const handleAnalyze = async () => {
    const trimmedDescription =
      jobDescription.trim();

    if (!resumeText.trim()) {
      setError(
        "Resume text is unavailable. Please process your resume again."
      );
      return;
    }

    if (!trimmedDescription) {
      setError(
        "Please enter a job description first."
      );
      return;
    }

    if (trimmedDescription.length < 20) {
      setError(
        "Please provide a more detailed job description."
      );
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const result = await matchJob(
        resumeText,
        resumeSkills,
        trimmedDescription
      );

      onMatchComplete(result);
    } catch (analysisError) {
      console.error(analysisError);

      const message =
        analysisError.response?.data?.detail ||
        "Unable to analyze the job description.";

      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const characterPercentage =
    (jobDescription.length / MAX_CHARACTERS) * 100;

  return (
    <motion.section
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
      className="rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.05,
            }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10"
          >
            <BriefcaseBusiness className="h-6 w-6 text-indigo-400" />
          </motion.div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Target Job Description
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Paste the job description you want ResumeIQ
              to compare against your resume.
            </p>
          </div>
        </div>

        <motion.div
          animate={{
            borderColor: isFocused
              ? "rgb(99 102 241)"
              : "rgb(51 65 85)",
            boxShadow: isFocused
              ? "0 0 0 3px rgba(99, 102, 241, 0.08)"
              : "0 0 0 0 rgba(99, 102, 241, 0)",
          }}
          className="overflow-hidden rounded-2xl border bg-slate-950/70"
        >
          <textarea
            value={jobDescription}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste the job description here..."
            rows={12}
            disabled={isAnalyzing}
            className="w-full resize-none bg-transparent p-5 text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="flex flex-col gap-3 border-t border-slate-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                {jobDescription.length.toLocaleString()} /{" "}
                {MAX_CHARACTERS.toLocaleString()}
              </span>

              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  animate={{
                    width: `${Math.min(
                      characterPercentage,
                      100
                    )}%`,
                  }}
                  className="h-full rounded-full bg-indigo-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExample}
                disabled={isAnalyzing}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ClipboardPaste className="h-4 w-4" />
                Use example
              </button>

              <AnimatePresence>
                {jobDescription && (
                  <motion.button
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    type="button"
                    onClick={handleClear}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
              className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

              <p className="text-sm text-red-300">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={handleAnalyze}
          disabled={
            !jobDescription.trim() ||
            isAnalyzing
          }
          whileHover={
            jobDescription.trim() && !isAnalyzing
              ? {
                  scale: 1.01,
                }
              : {}
          }
          whileTap={
            jobDescription.trim() && !isAnalyzing
              ? {
                  scale: 0.99,
                }
              : {}
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Analyze Job Match
            </>
          )}
        </motion.button>
      </div>
    </motion.section>
  );
}

export default JobDescription;