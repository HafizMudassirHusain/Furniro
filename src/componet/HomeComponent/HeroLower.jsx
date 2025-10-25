import { motion } from "framer-motion";
import dining from "../../assets/dining.png";
import living from "../../assets/living.png";
import bedroom from "../../assets/hero_Lower3.png";

function HeroLower() {
  const categories = [
    { name: "Dining", img: dining },
    { name: "Living", img: living },
    { name: "Bedroom", img: bedroom },
  ];

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between each child animation
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="w-[90%] md:w-[83%] mx-auto my-20">
      {/* Section Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900">
          Browse The Range
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Explore furniture pieces that bring comfort and style to every room.
        </p>
      </motion.div>

      {/* Category Cards with Staggered Animation */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((itemData, index) => (
          <motion.div
            key={index}
            variants={item}
            className="relative group w-full md:w-[32%] cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500"
          >
            {/* Image */}
            <motion.img
              src={itemData.img}
              alt={itemData.name}
              className="w-full h-[60vh] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 rounded-2xl" />

            {/* Text Reveal */}
            <motion.h3
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ y: -5 }}
            >
              {itemData.name}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default HeroLower;
