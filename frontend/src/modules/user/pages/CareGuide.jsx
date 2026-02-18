import React, { useEffect } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const CareGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif tracking-wider">The Art of Scents</h1>
            <p className="text-gray-400 text-sm tracking-[0.2em] uppercase">A Guide to Preserving Luxury</p>
          </div>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-light tracking-wide text-white border-b border-white/20 pb-4">Application Rituals</h2>
              <p className="text-gray-400 leading-relaxed font-light">
                Apply your fragrance to pulse points such as your wrists, neck, and behind the ears. These warm areas help diffuse the scent throughout the day. Avoid rubbing your wrists together, as this breaks down the delicate top notes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light tracking-wide text-white border-b border-white/20 pb-4">Storage & Preservation</h2>
              <p className="text-gray-400 leading-relaxed font-light">
                To maintain the integrity of your perfume, store it in a cool, dry place away from direct sunlight and humidity. Extreme temperature changes can alter the chemical composition. Keep the bottle tightly closed when not in use.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light tracking-wide text-white border-b border-white/20 pb-4">Layering Scents</h2>
              <p className="text-gray-400 leading-relaxed font-light">
                Enhance longevity by layering your fragrance. Start with an unscented moisturizer or a matching body lotion to create a hydrated base that holds the scent longer.
              </p>
            </section>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareGuide;
