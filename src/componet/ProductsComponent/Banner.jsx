import {
  CheckCircleOutlined,
  GiftOutlined,
  PhoneOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

export default function Banner({ backColor }) {
  const features = [
    {
      icon: <TrophyOutlined />,
      title: "High Quality",
      desc: "Crafted from top materials",
    },
    {
      icon: <CheckCircleOutlined />,
      title: "Warranty Protection",
      desc: "Over 2 years coverage",
    },
    {
      icon: <GiftOutlined />,
      title: "Free Shipping",
      desc: "On orders over $150",
    },
    {
      icon: <PhoneOutlined />,
      title: "24/7 Support",
      desc: "Dedicated customer service",
    },
  ];

  return (
    <section
      className="relative py-10 mt-20 md:py-16 px-6 md:px-12 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${backColor} 0%, #fff8e1 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-yellow-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-10 text-center">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center bg-white/30 backdrop-blur-lg rounded-2xl shadow-md p-6 w-[90%] sm:w-[45%] md:w-[22%] hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.2 }}
              className="text-5xl md:text-6xl text-yellow-600 mb-3"
            >
              {item.icon}
            </motion.div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
