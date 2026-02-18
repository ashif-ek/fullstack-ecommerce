import { useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const faqs = [
    {
        question: "How can I track my order?",
        answer: "Once your order ships, you will receive an email with a tracking number. You can also track your order status in your Account Dashboard under 'Order History'."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes! We ship to over 100 countries worldwide. International shipping rates and times vary depending on the destination."
    },
    {
        question: "Can I change or cancel my order?",
        answer: "We process orders quickly, but if you need to make a change, please contact us within 1 hour of placing your order. After that, we cannot guarantee changes can be made."
    },
    {
        question: "Are your fragrances 100% authentic?",
        answer: "Absolutely. We are an authorized retailer for all brands we carry, and our house brand Essence Rare is crafted directly by our master perfumers."
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery for unopened and unused items. Please visit our Shipping & Returns page for more details."
    },
    {
        question: "Do you offer free samples?",
        answer: "Yes! Every order comes with 2 complimentary samples of our latest collections so you can discover new favorites."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white font-light pt-24 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl tracking-widest mb-12 text-center">Frequently Asked Questions</h1>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-white/10 bg-gray-900/30 rounded-lg overflow-hidden">
                                <button 
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-lg tracking-wide">{faq.question}</span>
                                    <span className="text-2xl text-gray-400 font-light">
                                        {openIndex === index ? "−" : "+"}
                                    </span>
                                </button>
                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                                >
                                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 mb-4">Still have questions?</p>
                        <a href="/contact" className="inline-block bg-white text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
