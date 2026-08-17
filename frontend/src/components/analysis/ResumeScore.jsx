import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  Target,
  TrendingUp,
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


function getScoreDescription(score) {
  if (score >= 85) {
    return "Your resume is highly optimized and well structured.";
  }

  if (score >= 70) {
    return "Your resume has a strong foundation with room to improve.";
  }

  if (score >= 50) {
    return "Your resume has potential, but several areas need attention.";
  }

  return "Your resume needs significant improvements before applying.";
}


function getScoreColor(score) {
  if (score >= 85) {
    return {
      main: "text-emerald-300",
      stroke: "rgb(52 211 153)",
      glow: "bg-emerald-400",
      border: "border-emerald-400/20",
      background: "bg-emerald-400/[0.06]",
    };
  }

  if (score >= 70) {
    return {
      main: "text-blue-300",
      stroke: "rgb(96 165 250)",
      glow: "bg-blue-400",
      border: "border-blue-400/20",
      background: "bg-blue-400/[0.06]",
    };
  }

  if (score >= 50) {
    return {
      main: "text-amber-300",
      stroke: "rgb(251 191 36)",
      glow: "bg-amber-400",
      border: "border-amber-400/20",
      background: "bg-amber-400/[0.06]",
    };
  }

  return {
    main: "text-red-300",
    stroke: "rgb(248 113 113)",
    glow: "bg-red-400",
    border: "border-red-400/20",
    background: "bg-red-400/[0.06]",
  };
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

  const scoreColor = getScoreColor(overallScore);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#07101f]"
    >

      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`pointer-events-none absolute left-[12%] top-[15%] h-56 w-56 rounded-full ${scoreColor.glow}/10 blur-[100px]`}
      />


      {/* Technical top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />


      <div className="relative p-6 sm:p-8 lg:p-10">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 4,
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/[0.06]"
            >
              <Award
                className="h-5 w-5 text-blue-300"
                strokeWidth={1.5}
              />
            </motion.div>


            <div>
              <h3 className="font-semibold text-slate-100">
                Resume Intelligence
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                AI-powered resume quality assessment
              </p>
            </div>

          </div>


          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5">

            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-blue-400"
            />

            <span className="text-[11px] uppercase tracking-wider text-slate-500">
              AI analysis complete
            </span>

          </div>

        </div>


        {/* Main score area */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-center">

          {/* =================================================
              SCORE VISUALIZATION
          ================================================== */}

          <div className="flex justify-center">

            <div className="relative flex h-64 w-64 items-center justify-center">

              {/* Outer rotating ring */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-blue-400/10"
              />


              {/* Secondary ring */}
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-3 rounded-full border border-blue-300/[0.05]"
              />


              {/* SVG score ring */}
              <svg
                className="absolute inset-4 h-56 w-56 -rotate-90"
                viewBox="0 0 100 100"
              >

                <circle
                  cx="50"
                  cy="50"
                  r="41"
                  fill="none"
                  stroke="rgb(30 41 59)"
                  strokeWidth="5"
                />


                <motion.circle
                  cx="50"
                  cy="50"
                  r="41"
                  fill="none"
                  stroke={scoreColor.stroke}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="258"
                  initial={{
                    strokeDashoffset: 258,
                  }}
                  animate={{
                    strokeDashoffset:
                      258 -
                      (258 * overallScore) / 100,
                  }}
                  transition={{
                    duration: 1.7,
                    ease: "easeOut",
                  }}
                />

              </svg>


              {/* Center glow */}
              <motion.div
                animate={{
                  scale: [0.9, 1.12, 0.9],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute h-32 w-32 rounded-full ${scoreColor.glow}/10 blur-3xl`}
              />


              {/* Center */}
              <div className="relative z-10 text-center">

                <div className="flex items-end justify-center">

                  <span className="text-6xl font-semibold tracking-[-0.06em] text-slate-100">
                    <AnimatedNumber
                      value={overallScore}
                    />
                  </span>

                  <span className="mb-2 ml-1 text-xl text-slate-500">
                    %
                  </span>

                </div>


                <div
                  className={`mt-1 text-sm font-semibold ${scoreColor.main}`}
                >
                  {getScoreLabel(overallScore)}
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              SCORE INFORMATION
          ================================================== */}

          <div>

            <div className="flex items-start gap-3">

              <TrendingUp
                className="mt-1 h-5 w-5 shrink-0 text-blue-400"
                strokeWidth={1.6}
              />

              <div>

                <p className="text-sm font-medium text-slate-200">
                  Overall resume score
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {getScoreDescription(overallScore)}
                </p>

              </div>

            </div>


            {/* Metric cards */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              {SCORE_ITEMS.map(
                ({ key, label, icon: Icon }, index) => {

                  const score =
                    quality[key] ?? 0;

                  return (
                    <motion.div
                      key={key}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay:
                          0.25 +
                          index * 0.1,
                      }}
                      whileHover={{
                        y: -3,
                      }}
                      className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-colors hover:border-blue-400/15"
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2.5">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/[0.06]">

                            <Icon
                              className="h-4 w-4 text-blue-300/80"
                              strokeWidth={1.5}
                            />

                          </div>

                          <span className="text-sm text-slate-400">
                            {label}
                          </span>

                        </div>


                        <span className="text-sm font-semibold text-slate-200">
                          {score}%
                        </span>

                      </div>


                      {/* Progress */}
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800/80">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${score}%`,
                          }}
                          transition={{
                            duration: 1,
                            delay:
                              0.4 +
                              index * 0.1,
                            ease: "easeOut",
                          }}
                          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        >

                          <motion.div
                            animate={{
                              x: [
                                "-100%",
                                "100%",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-y-0 w-1/2 bg-white/20 blur-sm"
                          />

                        </motion.div>

                      </div>

                    </motion.div>
                  );
                }
              )}

            </div>


            {/* Score status */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
              className={`mt-4 flex items-center gap-2 rounded-xl border ${scoreColor.border} ${scoreColor.background} px-4 py-3`}
            >

              <CheckCircle2
                className={`h-4 w-4 ${scoreColor.main}`}
                strokeWidth={1.7}
              />

              <span className="text-xs text-slate-400">
                Resume analysis completed successfully.
              </span>

            </motion.div>

          </div>

        </div>


        {/* Bottom metadata */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-5 text-[11px] text-slate-600">

          <span>
            4 quality dimensions analyzed
          </span>

          <span>
            Structural analysis
          </span>

          <span>
            Content analysis
          </span>

          <span>
            Skills analysis
          </span>

        </div>

      </div>

    </motion.section>
  );
}


export default ResumeScore;