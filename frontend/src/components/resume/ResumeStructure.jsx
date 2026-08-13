import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FileCheck2,
  Languages,
  Medal,
  UserRound,
} from "lucide-react";


const SECTION_CONFIG = {
  summary: {
    label: "Summary",
    icon: UserRound,
  },
  experience: {
    label: "Experience",
    icon: BriefcaseBusiness,
  },
  education: {
    label: "Education",
    icon: BookOpen,
  },
  skills: {
    label: "Skills",
    icon: Code2,
  },
  projects: {
    label: "Projects",
    icon: FileCheck2,
  },
  certifications: {
    label: "Certifications",
    icon: Award,
  },
  achievements: {
    label: "Achievements",
    icon: Medal,
  },
  languages: {
    label: "Languages",
    icon: Languages,
  },
};


function ResumeStructure({ sections }) {
  const availableSections = Object.keys(sections || {});

  const sectionEntries = Object.entries(SECTION_CONFIG);

  const presentCount = sectionEntries.filter(
    ([section]) => availableSections.includes(section)
  ).length;

  const totalSections = sectionEntries.length;

  const coveragePercentage = Math.round(
    (presentCount / totalSections) * 100
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.15,
      }}
      className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-white">
            Resume Structure
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Sections detected in your resume
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Section coverage
          </p>

          <p className="mt-1 text-xl font-semibold text-indigo-400">
            {coveragePercentage}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sectionEntries.map(
          ([section, config], index) => {
            const isPresent =
              availableSections.includes(section);

            const Icon = config.icon;

            return (
              <motion.div
                key={section}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                className={`rounded-xl border p-4 transition-colors ${
                  isPresent
                    ? "border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-400/40"
                    : "border-slate-800 bg-slate-950/50 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isPresent
                        ? "bg-indigo-500/10"
                        : "bg-slate-800"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isPresent
                          ? "text-indigo-400"
                          : "text-slate-600"
                      }`}
                    />
                  </div>

                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      isPresent
                        ? "bg-emerald-400"
                        : "bg-slate-700"
                    }`}
                  />
                </div>

                <p
                  className={`mt-4 font-medium ${
                    isPresent
                      ? "text-white"
                      : "text-slate-500"
                  }`}
                >
                  {config.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {isPresent
                    ? "Detected"
                    : "Not detected"}
                </p>
              </motion.div>
            );
          }
        )}
      </div>
    </motion.section>
  );
}

export default ResumeStructure;