import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  FileCheck2,
  Sparkles,
  Target,
} from "lucide-react";


const SCORE_ITEMS = [
  {
    key: "section_score",
    label: "Sections",
    icon: FileCheck2,
  },
  {
    key: "skills_score",
    label: "Skills",
    icon: Sparkles,
  },
  {
    key: "content_score",
    label: "Content",
    icon: BarChart3,
  },
  {
    key: "structure_score",
    label: "Structure",
    icon: Target,
  },
];


function getScoreLabel(score) {
  if (score >= 85) {
    return "Excellent";
  }

  if (score >= 70) {
    return "Strong";
  }

  if (score >= 50) {
    return "Needs improvement";
  }

  return "Needs attention";
}


function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 1200;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setDisplayValue(
        Math.round(value * easedProgress)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return displayValue;
}


function ResumeScore({ quality }) {
  if (!quality) {
    return null;
  }

  const overallScore = quality.overall_score;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          {/* Score Circle */}
          <div className="flex justify-center lg:w-64">
            <div className="relative flex h-52 w-52 items-center justify-center">
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
                  strokeDasharray="264"
                  initial={{
                    strokeDashoffset: 264,
                  }}
                  animate={{
                    strokeDashoffset:
                      264 -
                      (264 * overallScore) / 100,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: "easeOut",
                  }}
                />
              </svg>

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-1">
                  <AnimatedNumber value={overallScore} />

                  <span className="text-2xl font-medium text-slate-500">
                    %
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-indigo-400">
                  {getScoreLabel(overallScore)}
                </p>
              </div>

              <motion.div
                className="absolute inset-6 rounded-full bg-indigo-500/5 blur-2xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Score Overview */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
                <Award className="h-6 w-6 text-indigo-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Resume Quality
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Overall assessment based on your resume structure and content
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {SCORE_ITEMS.map(
                ({ key, label, icon: Icon }, index) => {
                  const score = quality[key];

                  return (
                    <motion.div
                      key={key}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.1,
                      }}
                      whileHover={{
                        x: 4,
                      }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-slate-500" />

                          <span className="text-sm text-slate-300">
                            {label}
                          </span>
                        </div>

                        <span className="text-sm font-medium text-white">
                          {score}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${score}%`,
                          }}
                          transition={{
                            duration: 0.9,
                            delay: 0.3 + index * 0.1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full bg-indigo-400"
                        />
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default ResumeScore;