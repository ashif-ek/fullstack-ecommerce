import React, { useEffect } from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const stores = [
  {
    city: "New York",
    address: "5th Avenue, Suite 400",
    phone: "+1 (212) 555-0199",
    hours: "Mon-Sun: 10am - 8pm"
  },
  {
    city: "Paris",
    address: "12 Rue de la Paix",
    phone: "+33 1 42 68 53 00",
    hours: "Mon-Sat: 10am - 7pm"
  },
  {
    city: "Tokyo",
    address: "Ginza 6-chome, Chuo-ku",
    phone: "+81 3 5555 1234",
    hours: "Mon-Sun: 11am - 8pm"
  },
  {
    city: "Dubai",
    address: "The Dubai Mall, Fashion Avenue",
    phone: "+971 4 330 8080",
    hours: "Mon-Sun: 10am - 11pm"
  }
];

const StoreLocator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif tracking-wider">Our Boutiques</h1>
            <p className="text-gray-400 text-sm tracking-[0.2em] uppercase w-full">Find a NOIRÉL sanctuary near you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stores.map((store, index) => (
              <div key={index} className="border border-white/10 p-8 hover:border-white/30 transition-colors duration-300 group">
                <h3 className="text-2xl font-light mb-6 tracking-wide text-white group-hover:text-gray-200">{store.city}</h3>
                <div className="space-y-4 text-sm text-gray-400 font-light tracking-wide">
                  <p>{store.address}</p>
                  <p>{store.phone}</p>
                  <p className="pt-4 text-gray-500 text-xs uppercase tracking-widest">{store.hours}</p>
                </div>
                <button className="mt-8 text-[10px] uppercase tracking-[0.2em] border-b border-transparent hover:border-white pb-1 transition-all">
                  Get Directions
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 h-96 w-full bg-neutral-900 flex items-center justify-center border border-white/5 relative overflow-hidden">
             {/* Abstract Map Placeholder */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_resource_without_countries.svg')] bg-cover bg-center"></div>
             <p className="relative z-10 text-gray-500 tracking-[0.2em] text-xs uppercase">Global Presence</p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoreLocator;
