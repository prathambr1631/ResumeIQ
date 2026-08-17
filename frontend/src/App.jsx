import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  FileText,
  GraduationCap,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

import ResumeUpload from "./components/upload/ResumeUpload";


const floatingElements = [
  {
    icon: FileText,
    left: "6%",
    top: "20%",
    size: 22,
    duration: 14,
    delay: 0,
    x: [0, 35, -15, 0],
    y: [0, -25, 20, 0],
    rotate: [-5, 8, -3, -5],
  },
  {
    icon: BriefcaseBusiness,
    left: "88%",
    top: "17%",
    size: 24,
    duration: 17,
    delay: 2,
    x: [0, -30, 20, 0],
    y: [0, 25, -18, 0],
    rotate: [4, -8, 5, 4],
  },
  {
    icon: Search,
    left: "12%",
    top: "65%",
    size: 20,
    duration: 16,
    delay: 1,
    x: [0, 25, -20, 0],
    y: [0, 18, -25, 0],
    rotate: [0, 12, -8, 0],
  },
  {
    icon: CheckCircle2,
    left: "91%",
    top: "62%",
    size: 21,
    duration: 15,
    delay: 3,
    x: [0, -25, 15, 0],
    y: [0, -20, 25, 0],
    rotate: [0, -10, 8, 0],
  },
  {
    icon: GraduationCap,
    left: "23%",
    top: "88%",
    size: 23,
    duration: 18,
    delay: 1.5,
    x: [0, -25, 30, 0],
    y: [0, -18, 15, 0],
    rotate: [-3, 7, -5, -3],
  },
  {
    icon: ClipboardList,
    left: "76%",
    top: "86%",
    size: 21,
    duration: 16,
    delay: 4,
    x: [0, 25, -20, 0],
    y: [0, 20, -15, 0],
    rotate: [4, -6, 7, 4],
  },
  {
    icon: Target,
    left: "48%",
    top: "9%",
    size: 19,
    duration: 13,
    delay: 2.5,
    x: [0, 20, -25, 0],
    y: [0, -15, 20, 0],
    rotate: [0, 8, -8, 0],
  },
  {
    icon: FileSearch,
    left: "3%",
    top: "87%",
    size: 19,
    duration: 19,
    delay: 5,
    x: [0, 30, -15, 0],
    y: [0, -20, 15, 0],
    rotate: [-4, 10, -5, -4],
  },
];


function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Professional blue ambient glow */}
        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -40, 45, 0],
            scale: [1, 1.12, 0.94, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[10%] top-[-18%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.08] blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 45, -35, 0],
            scale: [1, 0.92, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-20%] right-[-5%] h-[650px] w-[650px] rounded-full bg-cyan-500/[0.06] blur-[150px]"
        />

        {/* Central subtle glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[42%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-400/[0.035] blur-[120px]"
        />


        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />


        {/* Small background stars / data points */}
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [0.1, 0.45, 0.1],
              scale: [0.7, 1.15, 0.7],
            }}
            transition={{
              duration: 3 + (index % 4),
              delay: index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-blue-300"
            style={{
              left: `${(index * 37) % 97}%`,
              top: `${(index * 53) % 94}%`,
            }}
          />
        ))}


        {/* =================================================
            FLOATING JOB / RESUME OBJECTS
        ================================================== */}

        {floatingElements.map(
          (item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                animate={{
                  x: item.x,
                  y: item.y,
                  rotate: item.rotate,
                  opacity: [0.16, 0.34, 0.16],
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: item.left,
                  top: item.top,
                }}
                className="absolute"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-300/[0.08] bg-blue-400/[0.035] shadow-lg shadow-blue-500/[0.03] backdrop-blur-sm">
                  <Icon
                    size={item.size}
                    strokeWidth={1.4}
                    className="text-blue-300/50"
                  />
                </div>
              </motion.div>
            );
          }
        )}


        {/* Moving scan line */}
        <motion.div
          animate={{
            y: ["-10vh", "110vh"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/[0.12] to-transparent"
        />

      </div>


      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <header className="relative z-30 border-b border-white/[0.06] bg-[#020817]/70 backdrop-blur-xl">

        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">

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
              duration: 0.6,
            }}
            className="flex items-center gap-3"
          >

            {/* Logo */}
            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: 3,
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.08]"
            >

              <BrainCircuit
                className="relative z-10 h-5 w-5 text-blue-300"
                strokeWidth={1.7}
              />

              <motion.div
                animate={{
                  opacity: [0.15, 0.5, 0.15],
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
              <p className="text-base font-semibold tracking-tight text-slate-100">
                Resume<span className="text-blue-400">IQ</span>
              </p>

              <p className="text-[11px] text-slate-500">
                AI resume intelligence
              </p>
            </div>

          </motion.div>


          {/* Status */}
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
              duration: 0.6,
              delay: 0.15,
            }}
            className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-1.5 sm:flex"
          >

            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />

            <span className="text-xs text-slate-400">
              AI engine online
            </span>

          </motion.div>

        </div>

      </header>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10">

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col items-center px-6 pb-24 pt-20 sm:px-10 lg:px-12 lg:pt-24">

          {/* Badge */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-400/[0.045] px-4 py-2"
          >

            <Sparkles
              className="h-3.5 w-3.5 text-blue-300"
              strokeWidth={1.8}
            />

            <span className="text-xs font-medium tracking-wide text-blue-200">
              AI-POWERED RESUME INTELLIGENCE
            </span>

          </motion.div>


          {/* Heading */}
          <div className="mt-8 text-center">

            <motion.h1
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-100 sm:text-6xl lg:text-7xl"
            >

              Understand your resume.

              <br />

              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Understand your opportunities.
              </span>

            </motion.h1>


            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg"
            >
              Analyze your resume, compare it with real job
              descriptions, and discover the skills that can
              move your career forward.
            </motion.p>

          </div>


          {/* Feature pills */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >

            {[
              {
                label: "Resume Analysis",
                icon: FileSearch,
              },
              {
                label: "Semantic Matching",
                icon: BrainCircuit,
              },
              {
                label: "AI Recommendations",
                icon: Sparkles,
              },
            ].map(
              ({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs text-slate-400"
                >

                  <Icon
                    className="h-3.5 w-3.5 text-blue-400/80"
                    strokeWidth={1.6}
                  />

                  {label}

                </motion.div>
              )
            )}

          </motion.div>


          {/* =================================================
              WORKSPACE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: "easeOut",
            }}
            className="mt-14 w-full max-w-4xl"
          >

            <div className="relative">

              {/* Workspace glow */}
              <div className="pointer-events-none absolute -inset-5 rounded-[34px] bg-blue-500/[0.035] blur-3xl" />


              {/* Outer frame */}
              <div className="relative rounded-[28px] border border-white/[0.08] bg-white/[0.025] p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">

                {/* Window header */}
                <div className="flex h-10 items-center justify-between px-4">

                  <div className="flex items-center gap-1.5">

                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />

                  </div>


                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">

                    <FileText className="h-3 w-3" />

                    Resume intelligence workspace

                  </div>


                  <div className="w-12" />

                </div>


                {/* Existing application */}
                <div className="rounded-[22px] border border-white/[0.05] bg-[#07101f] p-4 sm:p-8">

                  <ResumeUpload />

                </div>

              </div>

            </div>

          </motion.div>


          {/* Bottom hint */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.2,
              duration: 0.6,
            }}
            className="mt-10 flex items-center gap-2 text-xs text-slate-600"
          >

            <Target className="h-3.5 w-3.5" />

            <span>
              Upload your resume. Discover your next opportunity.
            </span>

            <ArrowRight className="h-3.5 w-3.5" />

          </motion.div>

        </div>

      </section>

    </main>
  );
}


export default App;