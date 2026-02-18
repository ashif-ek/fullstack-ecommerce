import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SizingGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden relative"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-light tracking-[0.2em] uppercase text-white">Sizing Guide</h2>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                <div className="space-y-8">
                    {/* Clothing Section */}
                    <section>
                        <h3 className="text-sm font-semibold tracking-widest text-white mb-4 uppercase">General Clothing</h3>
                        <p className="text-xs text-gray-400 mb-6 font-light">Measurements refer to body size, not garment dimensions.</p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs tracking-wider text-gray-300">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-500 uppercase">
                                        <th className="py-3 px-4 font-medium">Size</th>
                                        <th className="py-3 px-4 font-medium">Chest (in)</th>
                                        <th className="py-3 px-4 font-medium">Waist (in)</th>
                                        <th className="py-3 px-4 font-medium">Hips (in)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">XS</td>
                                        <td className="py-3 px-4">32 - 34</td>
                                        <td className="py-3 px-4">24 - 26</td>
                                        <td className="py-3 px-4">34 - 36</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">S</td>
                                        <td className="py-3 px-4">34 - 36</td>
                                        <td className="py-3 px-4">26 - 28</td>
                                        <td className="py-3 px-4">36 - 38</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">M</td>
                                        <td className="py-3 px-4">36 - 38</td>
                                        <td className="py-3 px-4">28 - 30</td>
                                        <td className="py-3 px-4">38 - 40</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">L</td>
                                        <td className="py-3 px-4">38 - 40</td>
                                        <td className="py-3 px-4">30 - 32</td>
                                        <td className="py-3 px-4">40 - 42</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">XL</td>
                                        <td className="py-3 px-4">40 - 42</td>
                                        <td className="py-3 px-4">32 - 34</td>
                                        <td className="py-3 px-4">42 - 44</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                     {/* Shoes Section */}
                     <section>
                        <h3 className="text-sm font-semibold tracking-widest text-white mb-4 uppercase pt-4 border-t border-white/5">Footwear</h3>
                         <div className="overflow-x-auto mt-4">
                            <table className="w-full text-left text-xs tracking-wider text-gray-300">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-500 uppercase">
                                        <th className="py-3 px-4 font-medium">US</th>
                                        <th className="py-3 px-4 font-medium">UK</th>
                                        <th className="py-3 px-4 font-medium">EU</th>
                                        <th className="py-3 px-4 font-medium">CM</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">6</td>
                                        <td className="py-3 px-4">5</td>
                                        <td className="py-3 px-4">38</td>
                                        <td className="py-3 px-4">24</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">7</td>
                                        <td className="py-3 px-4">6</td>
                                        <td className="py-3 px-4">40</td>
                                        <td className="py-3 px-4">25</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">8</td>
                                        <td className="py-3 px-4">7</td>
                                        <td className="py-3 px-4">41</td>
                                        <td className="py-3 px-4">26</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">9</td>
                                        <td className="py-3 px-4">8</td>
                                        <td className="py-3 px-4">42</td>
                                        <td className="py-3 px-4">27</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 text-white font-medium">10</td>
                                        <td className="py-3 px-4">9</td>
                                        <td className="py-3 px-4">43</td>
                                        <td className="py-3 px-4">28</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* How to Measure */}
                    <section className="bg-white/5 p-6 rounded-sm border border-white/5">
                        <h3 className="text-xs font-bold tracking-widest text-white mb-3 uppercase">How to Measure</h3>
                        <ul className="space-y-2 text-xs text-gray-400 font-light leading-relaxed">
                            <li><strong className="text-gray-300">Chest:</strong> Measure around the fullest part of the chest.</li>
                            <li><strong className="text-gray-300">Waist:</strong> Measure around the natural waistline.</li>
                            <li><strong className="text-gray-300">Hips:</strong> Measure around the fullest part of the hips.</li>
                        </ul>
                    </section>
                </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 text-center">
                 <p className="text-[10px] text-gray-500 uppercase tracking-wider">Still unsure? Contact our support team.</p>
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SizingGuideModal;
