import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Layers3,
  Lightbulb,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";


const CATEGORY_ICONS = {
  Programming: Code2,
  "Data Science": Layers3,
  "Machine Learning": Sparkles,
  "AI / NLP": Sparkles,
  Databases: Database,
  Backend: Server,
  DevOps: Wrench,
  Cloud: Cloud,
  General: BookOpen,
};


const PRIORITY_STYLES = {
  High: {
    badge:
      "border-red-500/20 bg-red-500/10 text-red-300",
    dot: "bg-red-400",
    impact: "text-red-300",
  },

  Medium: {
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-300",
    dot: "bg-amber-400",
    impact: "text-amber-300",
  },

  Low: {
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    dot: "bg-emerald-400",
    impact: "text-emerald-300",
  },
};


function JobRecommendations({
  recommendations = [],
}) {
  if (!recommendations.length) {
    return (
      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6"
      >
        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              You're well aligned
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              ResumeIQ didn't identify any major missing
              skills for this role.
            </p>
          </div>

        </div>
      </motion.section>
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
        duration: 0.5,
      }}
      className="rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8"
    >

      {/* Header */}
      <div className="flex items-start gap-4">

        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: 4,
          }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10"
        >
          <Lightbulb className="h-6 w-6 text-indigo-400" />
        </motion.div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            Recommended Improvements
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            ResumeIQ identified these areas as opportunities
            to improve your fit for this role.
          </p>
        </div>

      </div>


      {/* Recommendations */}
      <div className="mt-6 space-y-5">

        {recommendations.map(
          (item, index) => {
            const {
              skill,
              category,
              priority,
              why_flagged,
              suggested_action,
              resume_impact,
            } = item;

            const Icon =
              CATEGORY_ICONS[category] ||
              CATEGORY_ICONS.General;

            const priorityStyle =
              PRIORITY_STYLES[priority] ||
              PRIORITY_STYLES.Medium;

            return (
              <motion.div
                key={`${skill}-${index}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                whileHover={{
                  y: -3,
                }}
                className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition-all hover:border-indigo-500/30"
              >

                {/* Top section */}
                <div className="flex items-start gap-4">

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 3,
                    }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-indigo-400 transition group-hover:bg-indigo-500/10"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>


                  <div className="min-w-0 flex-1">

                    {/* Title row */}
                    <div className="flex flex-wrap items-center gap-2">

                      <h4 className="text-base font-semibold text-white">
                        {skill}
                      </h4>

                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                        {category}
                      </span>

                      <span
                        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${priorityStyle.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`}
                        />

                        {priority} priority
                      </span>

                    </div>


                    {/* Why */}
                    <div className="mt-5">

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Why ResumeIQ flagged this
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {why_flagged}
                      </p>

                    </div>


                    {/* Suggested Action */}
                    <div className="mt-5 rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4">

                      <div className="flex items-start gap-3">

                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                            Suggested action
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {suggested_action}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* Resume Impact */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

                      <div className="flex items-center gap-2">

                        <span className="text-xs font-medium text-slate-500">
                          Resume impact
                        </span>

                        <span
                          className={`text-xs font-semibold ${priorityStyle.impact}`}
                        >
                          {resume_impact}
                        </span>

                      </div>


                      <div className="flex items-center gap-1.5 text-xs text-indigo-400 opacity-70 transition group-hover:opacity-100">

                        <span>
                          Add to learning roadmap
                        </span>

                        <ArrowUpRight className="h-4 w-4" />

                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>
            );
          }
        )}

      </div>


      {/* Footer */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay:
            recommendations.length * 0.08 + 0.2,
        }}
        className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4"
      >

        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />

        <div>

          <p className="text-sm font-medium text-white">
            Personalized improvement strategy
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Priorities are determined from the skills missing
            from the target role and the overall semantic
            similarity between your resume and the job.
          </p>

        </div>

      </motion.div>

    </motion.section>
  );
}


export default JobRecommendations;