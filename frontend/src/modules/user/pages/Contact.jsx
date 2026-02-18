import { useState } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Api from "../../../services/api";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Api.post("/communication/contact/", formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-light pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl tracking-widest mb-4">Contact Us</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              We'd love to hear from you. Whether you have a question about our fragrances, pricing, or need assistance, our team is ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl tracking-wider mb-2">Customer Service</h3>
                <p className="text-gray-400">support@noirel.com</p>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-xl tracking-wider mb-2">Press Inquiries</h3>
                <p className="text-gray-400">press@noirel.com</p>
              </div>
              <div>
                <h3 className="text-xl tracking-wider mb-2">Headquarters</h3>
                <p className="text-gray-400">123 Luxury Lane, New York, NY 10001</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
