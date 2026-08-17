import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Database,
  Globe,
  LineChart,
  Server,
  Sparkles,
} from "lucide-react";


const CATEGORY_CONFIG = {
  programming_languages: {
    label: "Programming",
    icon: Code2,
    accent: "blue",
  },
  data_science: {
    label: "Data Science",
    icon: LineChart,
    accent: "cyan",
  },
  machine_learning: {
    label: "Machine Learning",
    icon: Brain,
    accent: "violet",
  },
  databases: {
    label: "Databases",
    icon: Database,
    accent: "emerald",
  },
  web_development: {
    label: "Web Development",
    icon: Globe,
    accent: "sky",
  },
  cloud_devops: {
    label: "Cloud & DevOps",
    icon: Server,
    accent: "amber",
  },
  ai_tools: {
    label: "AI Tools",
    icon: Sparkles,
    accent: "indigo",
  },
};


const ACCENT_STYLES = {
  blue: {
    icon: "text-blue-300",
    iconBg: "bg-blue-400/[0.07]",
    border: "border-blue-400/10",
    hoverBorder: "hover:border-blue-400/25",
    chip: "border-blue-400/10 bg-blue-400/[0.045] text-blue-200",
    chipHover:
      "hover:border-blue-300/25 hover:bg-blue-400/[0.08]",
    progress: "from-blue-500 to-cyan-400",
    glow: "bg-blue-400",
  },

  cyan: {
    icon: "text-cyan-300",
    iconBg: "bg-cyan-400/[0.07]",
    border: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/25",
    chip: "border-cyan-400/10 bg-cyan-400/[0.045] text-cyan-200",
    chipHover:
      "hover:border-cyan-300/25 hover:bg-cyan-400/[0.08]",
    progress: "from-cyan-500 to-sky-400",
    glow: "bg-cyan-400",
  },

  violet: {
    icon: "text-violet-300",
    iconBg: "bg-violet-400/[0.07]",
    border: "border-violet-400/10",
    hoverBorder: "hover:border-violet-400/25",
    chip: "border-violet-400/10 bg-violet-400/[0.045] text-violet-200",
    chipHover:
      "hover:border-violet-300/25 hover:bg-violet-400/[0.08]",
    progress: "from-violet-500 to-blue-400",
    glow: "bg-violet-400",
  },

  emerald: {
    icon: "text-emerald-300",
    iconBg: "bg-emerald-400/[0.07]",
    border: "border-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/25",
    chip: "border-emerald-400/10 bg-emerald-400/[0.045] text-emerald-200",
    chipHover:
      "hover:border-emerald-300/25 hover:bg-emerald-400/[0.08]",
    progress: "from-emerald-500 to-cyan-400",
    glow: "bg-emerald-400",
  },

  sky: {
    icon: "text-sky-300",
    iconBg: "bg-sky-400/[0.07]",
    border: "border-sky-400/10",
    hoverBorder: "hover:border-sky-400/25",
    chip: "border-sky-400/10 bg-sky-400/[0.045] text-sky-200",
    chipHover:
      "hover:border-sky-300/25 hover:bg-sky-400/[0.08]",
    progress: "from-sky-500 to-blue-400",
    glow: "bg-sky-400",
  },

  amber: {
    icon: "text-amber-300",
    iconBg: "bg-amber-400/[0.07]",
    border: "border-amber-400/10",
    hoverBorder: "hover:border-amber-400/25",
    chip: "border-amber-400/10 bg-amber-400/[0.045] text-amber-200",
    chipHover:
      "hover:border-amber-300/25 hover:bg-amber-400/[0.08]",
    progress: "from-amber-500 to-orange-400",
    glow: "bg-amber-400",
  },

  indigo: {
    icon: "text-indigo-300",
    iconBg: "bg-indigo-400/[0.07]",
    border: "border-indigo-400/10",
    hoverBorder: "hover:border-indigo-400/25",
    chip: "border-indigo-400/10 bg-indigo-400/[0.045] text-indigo-200",
    chipHover:
      "hover:border-indigo-300/25 hover:bg-indigo-400/[0.08]",
    progress: "from-indigo-500 to-blue-400",
    glow: "bg-indigo-400",
  },
};


function DetectedSkills({ skills }) {
  const categories = Object.entries(skills || {}).filter(
    ([category, categorySkills]) =>
      CATEGORY_CONFIG[category] &&
      Array.isArray(categorySkills) &&
      categorySkills.length > 0
  );


  const totalSkills = categories.reduce(
    (total, [, categorySkills]) =>
      total + categorySkills.length,
    0
  );


  if (categories.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-[28px] border border-white/[0.08] bg-[#07101f] p-6 sm:p-8"
      >

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/[0.06]">
            <Brain
              className="h-5 w-5 text-blue-300"
              strokeWidth={1.5}
            />
          </div>

          <div>

            <h3 className="font-semibold text-slate-100">
              No skills detected
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              We couldn't identify technical skills from the
              extracted resume text.
            </p>

          </div>

        </div>

      </motion.div>
    );
  }


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
        duration: 0.6,
        delay: 0.1,
      }}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#07101f]"
    >

      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]"
      />


      <div className="relative p-6 sm:p-8">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 4,
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/[0.06]"
            >

              <Brain
                className="relative z-10 h-6 w-6 text-blue-300"
                strokeWidth={1.4}
              />

              <motion.div
                animate={{
                  opacity: [0.1, 0.35, 0.1],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-xl bg-blue-400/10 blur-md"
              />

            </motion.div>


            <div>

              <h3 className="font-semibold text-slate-100">
                Detected Skills
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Skills identified from your resume
              </p>

            </div>

          </div>


          {/* Skill count */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="flex items-center gap-3 self-start rounded-2xl border border-blue-400/10 bg-blue-400/[0.04] px-4 py-3 sm:self-auto"
          >

            <div className="text-right">

              <p className="text-2xl font-semibold tracking-tight text-slate-100">
                {totalSkills}
              </p>

              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                skills found
              </p>

            </div>

            <Sparkles
              className="h-5 w-5 text-blue-300"
              strokeWidth={1.4}
            />

          </motion.div>

        </div>


        {/* =================================================
            CATEGORY GRID
        ================================================== */}

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          {categories.map(
            ([category, categorySkills], categoryIndex) => {

              const config =
                CATEGORY_CONFIG[category];

              const styles =
                ACCENT_STYLES[config.accent] ||
                ACCENT_STYLES.blue;

              const Icon = config.icon;


              const categoryPercentage =
                Math.min(
                  (categorySkills.length /
                    Math.max(totalSkills, 1)) *
                    100,
                  100
                );


              return (
                <motion.div
                  key={category}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay:
                      0.15 +
                      categoryIndex * 0.08,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className={`group relative overflow-hidden rounded-2xl border ${styles.border} bg-white/[0.02] p-5 transition-colors ${styles.hoverBorder}`}
                >

                  {/* Category glow */}
                  <motion.div
                    animate={{
                      opacity: [0.03, 0.08, 0.03],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: categoryIndex * 0.4,
                    }}
                    className={`pointer-events-none absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full ${styles.glow} blur-3xl`}
                  />


                  {/* Category header */}
                  <div className="relative flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${styles.iconBg}`}
                      >

                        <Icon
                          className={`h-4 w-4 ${styles.icon}`}
                          strokeWidth={1.5}
                        />

                      </div>


                      <div>

                        <h4 className="text-sm font-medium text-slate-200">
                          {config.label}
                        </h4>

                        <p className="mt-0.5 text-[11px] text-slate-600">
                          {categorySkills.length}{" "}
                          {categorySkills.length === 1
                            ? "skill"
                            : "skills"}
                        </p>

                      </div>

                    </div>


                    <span className="text-xs font-medium text-slate-600">
                      {Math.round(categoryPercentage)}%
                    </span>

                  </div>


                  {/* Category progress */}
                  <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-slate-800/70">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${categoryPercentage}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        delay:
                          0.3 +
                          categoryIndex * 0.08,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${styles.progress}`}
                    />

                  </div>


                  {/* Skills */}
                  <div className="relative mt-5 flex flex-wrap gap-2">

                    {categorySkills.map(
                      (skill, skillIndex) => (
                        <motion.span
                          key={`${category}-${skill}`}
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                            y: 6,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay:
                              0.25 +
                              categoryIndex * 0.08 +
                              skillIndex * 0.045,
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                          }}
                          className={`cursor-default rounded-lg border px-2.5 py-1.5 text-xs transition-all ${styles.chip} ${styles.chipHover}`}
                        >
                          {skill}
                        </motion.span>
                      )
                    )}

                  </div>

                </motion.div>
              );
            }
          )}

        </div>


        {/* =================================================
            FOOTER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay:
              0.3 +
              categories.length * 0.08,
          }}
          className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5"
        >

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-400/[0.05]">

            <Sparkles
              className="h-3.5 w-3.5 text-blue-300/70"
              strokeWidth={1.5}
            />

          </div>


          <p className="text-xs leading-5 text-slate-600">
            Skills are automatically identified and grouped
            from the content of your uploaded resume.
          </p>

        </motion.div>

      </div>

    </motion.section>
  );
}


export default DetectedSkills;