import { motion } from "framer-motion";
import {
  CheckCircle2,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";


function getMatchLabel(score) {
  if (score >= 85) {
    return "Excellent match";
  }

  if (score >= 70) {
    return "Strong match";
  }

  if (score >= 50) {
    return "Moderate match";
  }

  return "Low match";
}


function JobMatchResult({ result }) {
  if (!result) {
    return null;
  }

  const {
    match_score,
    matched_skills,
    missing_skills,
  } = result;

  const circumference = 264;

  const strokeOffset =
    circumference -
    (circumference * match_score) / 100;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
            <Target className="h-6 w-6 text-indigo-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Job Match Analysis
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              How your detected skills compare with the target role
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgb(30 41 59)"
                strokeWidth="7"
              />

              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgb(129 140 248)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: strokeOffset,
                }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                }}
              />
            </svg>

            <div className="relative z-10 text-center">
              <motion.p
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.4,
                }}
                className="text-4xl font-bold text-white"
              >
                {match_score}%
              </motion.p>

              <p className="mt-1 text-sm font-medium text-indigo-400">
                {getMatchLabel(match_score)}
              </p>
            </div>
          </div>
        </div>

        {/* Skill comparison */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Matched */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.4,
            }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />

              <h4 className="font-medium text-white">
                Matched Skills
              </h4>

              <span className="ml-auto rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                {matched_skills.length}
              </span>
            </div>

            {matched_skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {matched_skills.map(
                  (skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay:
                          0.45 + index * 0.06,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300"
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No matching skills detected.
              </p>
            )}
          </motion.div>

          {/* Missing */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.4,
            }}
            className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5"
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-amber-400" />

              <h4 className="font-medium text-white">
                Missing Skills
              </h4>

              <span className="ml-auto rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-400">
                {missing_skills.length}
              </span>
            </div>

            {missing_skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {missing_skills.map(
                  (skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay:
                          0.45 + index * 0.06,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-300"
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            ) : (
              <p className="mt-4 text-sm text-emerald-400">
                No major missing skills detected.
              </p>
            )}
          </motion.div>
        </div>

        {/* Insight */}
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.65,
          }}
          className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4"
        >
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />

          <div>
            <p className="text-sm font-medium text-white">
              Matching insight
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Focus on the missing skills above when tailoring
              your resume or preparing for this role.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default JobMatchResult;