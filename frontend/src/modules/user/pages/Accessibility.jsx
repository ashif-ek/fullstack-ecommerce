import React, { useEffect } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const Accessibility = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif tracking-wider">Accessibility</h1>
            <div className="h-px w-20 bg-white mx-auto"></div>
          </div>

          <div className="space-y-8 text-gray-400 font-light leading-relaxed">
            <p>
              NOIRÉL is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <section className="space-y-3">
              <h3 className="text-white text-lg tracking-widest uppercase">Conformance Status</h3>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. NOIRÉL is partially conformant with WCAG 2.1 level AA.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-white text-lg tracking-widest uppercase">Feedback</h3>
              <p>
                We welcome your feedback on the accessibility of NOIRÉL. Please let us know if you encounter accessibility barriers on our site:
              </p>
              <ul className="list-disc pl-5 space-y-2 pt-2">
                <li>E-mail: accessibility@noirel.com</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </section>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Accessibility;
