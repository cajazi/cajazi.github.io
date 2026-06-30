import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/motion";
import { profile } from "../../data/profile";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300"
        >
          {profile.role}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl"
        >
          {profile.headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-3xl text-xl leading-9 text-slate-300"
        >
          {profile.summary}
        </motion.p>
      </motion.div>
    </section>
  );
}
