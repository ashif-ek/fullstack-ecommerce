import Navbar from "../../../components/navbar"; 
import Footer from "../../../components/footer"; 
import { Link } from "react-router-dom";

export default function OurStory() {
  return (
    <>
      <Navbar />
      <div className="bg-black text-white font-light">
        {/* Header Section */}
        <div className="relative h-[60vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

              alt="Artisanal perfume ingredients"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="relative z-10 px-6">
            <h1 className="text-5xl md:text-7xl font-playfair mb-4 tracking-wider">The Art of Scent</h1>
            <p className="text-xl text-gray-300 tracking-widest uppercase">Our Philosophy & Craft</p>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="py-24 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6 tracking-wide">
            Scent is an unspoken language, a memory held in a breath.
          </h2>
          <div className="w-20 h-px bg-white/40 mx-auto mb-8"></div>
          <p className="text-gray-300 leading-relaxed text-lg">
            At **Essence Rare**, we believe that fragrance is the most intimate form of art. It is a personal signature, a whisper of identity that precedes a word and lingers after a departure. Our journey began with a simple yet profound vision: to capture the world's most evocative moments in a bottle, transforming fleeting memories into timeless treasures.
          </p>
        </div>

        {/* Core Pillars Section */}
        <div className="py-24 bg-gray-900/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {/* Pillar 1: Ingredients */}
                    <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387-.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806a2 2 0 00-1.022-.547z M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>
                        <h3 className="text-xl uppercase tracking-widest mb-3">Finest Ingredients</h3>
                        <p className="text-gray-400 leading-relaxed">We traverse the globe to source rare and precious raw materials, ensuring every note in our compositions is of the highest possible purity and quality.</p>
                    </div>
                    {/* Pillar 2: Craftsmanship */}
                    <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        <h3 className="text-xl uppercase tracking-widest mb-3">Meticulous Craft</h3>
                        <p className="text-gray-400 leading-relaxed">Each fragrance is an act of patience and precision. Our master perfumers blend art and alchemy, composing scents that are both complex and harmonious.</p>
                    </div>
                    {/* Pillar 3: Philosophy */}
                    <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <h3 className="text-xl uppercase tracking-widest mb-3">A Sensory Journey</h3>
                        <p className="text-gray-400 leading-relaxed">Our creations are more than just perfumes; they are invitations to embark on a sensory journey, to explore landscapes of emotion and memory.</p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Founder's Note Section */}
        <div className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <blockquote className="text-3xl italic text-gray-200 leading-snug mb-6">
                    "We don’t just create perfumes. We bottle stories. My hope is that you find a scent within our collection that becomes a chapter in yours."
                </blockquote>
                <cite className="text-gray-400 tracking-widest not-italic">— Ashif E.K</cite>
            </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-24 border-t border-white/10 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl mb-8 tracking-wider">Discover Your Signature</h2>
            <Link 
              to="/products"
              className="inline-block bg-white text-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-gray-200 transition-colors duration-300"
            >
              Explore the Collection
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}