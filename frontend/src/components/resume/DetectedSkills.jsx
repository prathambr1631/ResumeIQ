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
  },
  data_science: {
    label: "Data Science",
    icon: LineChart,
  },
  machine_learning: {
    label: "Machine Learning",
    icon: Brain,
  },
  databases: {
    label: "Databases",
    icon: Database,
  },
  web_development: {
    label: "Web Development",
    icon: Globe,
  },
  cloud_devops: {
    label: "Cloud & DevOps",
    icon: Server,
  },
  ai_tools: {
    label: "AI Tools",
    icon: Sparkles,
  },
};


function DetectedSkills({ skills }) {
  const categories = Object.entries(skills || {});

  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
            <Brain className="h-5 w-5 text-indigo-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              No skills detected
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              We couldn't identify skills from the extracted resume text.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
      className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
          <Brain className="h-6 w-6 text-indigo-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Detected Skills
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Skills identified from your resume
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map(([category, categorySkills], categoryIndex) => {
          const config = CATEGORY_CONFIG[category];

          if (!config) {
            return null;
          }

          const Icon = config.icon;

          return (
            <div key={category}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-slate-400" />

                <h4 className="text-sm font-medium text-slate-300">
                  {config.label}
                </h4>

                <span className="text-xs text-slate-600">
                  {categorySkills.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      delay:
                        categoryIndex * 0.08 +
                        skillIndex * 0.05,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    className="cursor-default rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-300 transition-colors hover:border-indigo-400/40 hover:bg-indigo-500/20"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default DetectedSkills;