import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1 from "../../assets/rectangle24.png";
import image2 from "../../assets/Rectangle25.png";
import "../Hero.css";

const cardData = [
  {
    title: "Modern Luxury Suite",
    description: "A modern space with elegant textures and cozy lighting.",
    image: image1,
  },
  {
    title: "Cozy Comfort Room",
    description: "Warm tones and simple decor to help you unwind.",
    image: image2,
  },
  {
    title: "Minimalist Haven",
    description: "A peaceful escape with neutral colors and clean lines.",
    image: image1,
  },
  {
    title: "Artistic Retreat",
    description: "Vibrant room featuring art-inspired design and comfort.",
    image: image2,
  },
  {
    title: "Scandinavian Serenity",
    description: "Bright, airy, and perfectly balanced with wood accents.",
    image: image1,
  },
];

export default function Carousels() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === cardData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? cardData.length - 1 : prev - 1
    );
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white flex flex-col items-center overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-[90%] mx-auto">
        {/* 🟡 Left Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[400px] text-center md:text-left"
        >
          <h1 className="font-bold text-4xl md:text-5xl leading-tight text-gray-900">
            50+ Beautiful Rooms Inspiration
          </h1>
          <p className="text-gray-600 text-base mt-4 leading-relaxed">
            Our designers have crafted many stunning room prototypes to help
            you get inspired and plan your dream interior.
          </p>
          <button className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-yellow-300/50">
            Explore More
          </button>
        </motion.div>

        {/* 🖼️ Interactive Drag Carousel */}
        <div className="relative w-full md:w-[65%] flex justify-center items-center select-none">
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-[-45px] z-10 bg-white/90 hover:bg-yellow-500 hover:text-white p-3 rounded-full shadow-md transition-all duration-300"
          >
            <FaChevronLeft size={18} />
          </button>

          <motion.div
            ref={carouselRef}
            className="cursor-grab active:cursor-grabbing overflow-hidden w-full"
          >
            <motion.div
              drag="x"
              dragConstraints={carouselRef}
              dragElastic={0.15}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
              whileTap={{ cursor: "grabbing" }}
              className="flex gap-6"
              initial={{ x: 0 }}
              animate={{
                x: -currentSlide * 330,
                transition: { duration: 0.8, type: "spring" },
              }}
            >
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  className="relative w-[280px] md:w-[300px] lg:w-[320px] rounded-2xl shadow-xl overflow-hidden flex-shrink-0 group"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[380px] object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                  <div className="absolute bottom-0 p-5 text-white">
                    <h3 className="text-xl font-semibold mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-200">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-[-45px] z-10 bg-white/90 hover:bg-yellow-500 hover:text-white p-3 rounded-full shadow-md transition-all duration-300"
          >
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 🔘 Pagination Dots */}
      <div className="flex gap-3 mt-10">
        {cardData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-yellow-500 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
