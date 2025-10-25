
import { motion } from "framer-motion";
import { Image } from "antd";

import gallery1 from "../../assets/Galleryimage1.png";
import gallery2 from "../../assets/Galleryimage2.png";
import gallery3 from "../../assets/Galleryimage3.png";
import gallery5 from "../../assets/Galleryimage5.png";
import gallery6 from "../../assets/Galleryimage6.png";
import gallery7 from "../../assets/Galleryimage7.png";
import gallery8 from "../../assets/Galleryimage8.png";

const imageData = [
  { id: 1, title: "Elegant Living", src: gallery1 },
  { id: 2, title: "Cozy Workspace", src: gallery2 },
  { id: 3, title: "Nordic Bedroom", src: gallery3 },
  { id: 4, title: "Sunset Lounge", src: gallery5 },
  { id: 5, title: "Art Wall", src: gallery6 },
  { id: 6, title: "Modern Minimal", src: gallery7 },
  { id: 7, title: "Earth Tone Aesthetic", src: gallery8 },
];

export default function ImageGallery() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#fffaf3] to-white relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#f8e8b5]/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f7d98b]/30 rounded-full blur-3xl"></div>

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase text-[#b88e2f] tracking-[6px] font-semibold text-sm mb-3"
        >
          #FuniroFurniture
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
        >
          Beautiful Spaces, Shared by You
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-500 mt-5 text-lg"
        >
          Discover how our community styles their homes with comfort and elegance.
        </motion.p>
      </div>

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 px-6 md:px-10 max-w-7xl mx-auto relative z-10">
        {imageData.map((image, index) => (
          <motion.div
            key={image.id}
            className="mb-5 relative overflow-hidden rounded-3xl group cursor-pointer"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <Image
              src={image.src}
              alt={image.title}
              preview={false}
              className="w-full object-cover rounded-3xl brightness-95 group-hover:brightness-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
              <h2 className="text-white font-semibold text-lg">
                {image.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="text-center mt-16 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 bg-[#b88e2f] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore the Community
        </motion.button>
      </div>
    </section>
  );
}
