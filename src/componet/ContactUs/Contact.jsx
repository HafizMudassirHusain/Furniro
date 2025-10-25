import { useState } from "react";
import { message, Button } from "antd";
import { PhoneFilled, ClockCircleFilled, MailOutlined } from "@ant-design/icons";
import { LucideMapPin } from "lucide-react";
import producthero from "../../assets/producthero1.1.jpg";
import navlogo from "../../assets/navLogo.png";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";
import Banner from "../ProductsComponent/Banner";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_5ru6wmm",
        "template_ax35b4d",
        {
          name: formData.name,
          subject: formData.subject,
          email: formData.email,
          message: formData.message,
        },
        "Pv3yL9ioNcyiGiaxV"
      )
      .then(
        () => {
          message.success("✅ Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        () => message.error("❌ Failed to send message. Try again later.")
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* ===== Hero Section ===== */}
      <div
        className="relative h-[45vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${producthero})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center text-white">
          <div className="flex justify-center mb-3">
            <img src={navlogo} alt="Funiro" className="w-16 h-16 rounded-full drop-shadow-lg" />
          </div>
          <h1 className="text-5xl font-bold tracking-wide drop-shadow-md">Contact Us</h1>
          <p className="mt-3 text-gray-200 text-lg">
            <Link to="/" className="hover:text-[#e0c869] transition-all duration-300">
              Home
            </Link>{" "}
            / Contact
          </p>
        </div>
      </div>

      {/* ===== Contact Section ===== */}
      <section className="container mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Get In Touch With Us
          </h2>
          <p className="text-gray-600 text-lg">
            We’d love to hear from you! Drop a message or reach us through our contact details below.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Contact Info */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            {[
              {
                icon: <LucideMapPin size={32} className="text-[#e0c869]" />,
                title: "Address",
                text: (
                  <>
                    House No.664C, Sector 11-C <br />
                    Madina Colony, Orangi Town, Karachi
                  </>
                ),
              },
              {
                icon: <PhoneFilled className="text-2xl text-[#e0c869]" />,
                title: "Phone",
                text: (
                  <>
                    Mobile: +92 465475847 <br />
                    Hotline: +92 46547547
                  </>
                ),
              },
              {
                icon: <ClockCircleFilled className="text-2xl text-[#e0c869]" />,
                title: "Working Hours",
                text: <>Mon – Fri: 9:00 AM – 10:00 PM</>,
              },
              {
                icon: <MailOutlined className="text-2xl text-[#e0c869]" />,
                title: "Email",
                text: <>support@funiro.com</>,
              },
            ].map((info, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-[#e0c869]/20 p-3 rounded-full">{info.icon}</div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800">{info.title}</h3>
                  <p className="text-gray-600 text-sm leading-6">{info.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/3 bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#e0c869] focus:ring-2 focus:ring-[#e0c869]/40 outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#e0c869] focus:ring-2 focus:ring-[#e0c869]/40 outline-none transition"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#e0c869] focus:ring-2 focus:ring-[#e0c869]/40 outline-none transition"
                placeholder="Subject"
              />
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#e0c869] focus:ring-2 focus:ring-[#e0c869]/40 outline-none transition"
                placeholder="Write your message..."
              />
            </div>

            <Button
              htmlType="submit"
              loading={loading}
              className="mt-8 w-full py-3 text-lg font-semibold rounded-md transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #d4af37, #e0c869)",
                border: "none",
                color: "#fff",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>

      {/* Optional Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps?q=Orangi%20Town%20Karachi&output=embed"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="rounded-none border-none"
        ></iframe>
      </div>

      <Banner backColor={"#e0c869"} />
    </>
  );
};

export default Contact;
