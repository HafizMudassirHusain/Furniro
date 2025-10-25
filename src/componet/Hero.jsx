import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Landheroimg from "../assets/land_Hero_img1.jpg";

function Hero() {
  const ref = useRef(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-[100vh] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{
          backgroundImage: `url(${Landheroimg})`,
          y,
        }}
        className="absolute inset-0 bg-cover bg-center"
      />

      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-28 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="uppercase tracking-[4px] text-yellow-400 text-sm md:text-base font-semibold mb-4">
          New Arrivals
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Discover Our New Collection
        </h1>

        <p className="text-gray-200 text-sm md:text-lg mb-8 max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam sed
          dolores, tempora dolore officia cupiditate.
        </p>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full shadow-lg transition-all duration-300 w-fit"
        >
          Buy Now
        </motion.button>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown size={32} className="opacity-80" />
      </motion.div>
    </section>
  );
}

export default Hero;
