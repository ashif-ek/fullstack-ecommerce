import { useState, useCallback } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import Api from "../../../services/api";
import InlineFeedback from "../../../components/InlineFeedback";
import { throttle } from "lodash";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "", isVisible: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Throttled submission handler to prevent rapid clicks
  const throttledSubmit = useCallback(
    throttle(async (data) => {
      setLoading(true);
      setFeedback({ isVisible: false, message: "", type: "" });
      try {
        const response = await fetch("https://formspree.io/f/xjgeebja", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          setFeedback({ type: "success", message: "Message sent successfully!", isVisible: true, duration: 3000 });
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setFeedback({ type: "error", message: "Failed to send message.", isVisible: true });
        }
      } catch (err) {
        console.error("Error sending message:", err);
        setFeedback({ type: "error", message: "Failed to send message.", isVisible: true });
      } finally {
        setLoading(false);
      }
    }, 2000, { trailing: false }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    throttledSubmit(formData);
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
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-gray-900/50 border border-white/10 p-3 text-white focus:border-white transition-colors outline-none resize-none"
                ></textarea>
              </div>
              
              <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black py-3 uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                   <InlineFeedback 
                    {...feedback} 
                    onClose={() => setFeedback(p => ({ ...p, isVisible: false }))} 
                   />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
