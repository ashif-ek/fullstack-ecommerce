import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-light pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl tracking-widest mb-12 text-center">Terms of Service</h1>
            
            <div className="space-y-8 text-gray-400 leading-relaxed">
                <p>Last updated: February 2026</p>

                <p>
                    Please read these terms and conditions carefully before using Our Service.
                </p>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Acknowledgment</h2>
                <p>
                   These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Intellectual Property</h2>
                <p>
                    The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.
                </p>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Termination</h2>
                <p>
                    We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>
                
                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Limitation of Liability</h2>
                <p>
                    Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
                </p>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Contact Us</h2>
                <p>If you have any questions about these Terms, You can contact us:</p>
                <ul className="list-disc pl-5">
                    <li>By email: legal@noirel.com</li>
                </ul>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
