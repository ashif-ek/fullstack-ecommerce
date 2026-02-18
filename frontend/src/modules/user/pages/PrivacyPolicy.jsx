import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-light pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl tracking-widest mb-12 text-center">Privacy Policy</h1>
            
            <div className="space-y-8 text-gray-400 leading-relaxed">
                <p>Last updated: February 2026</p>

                <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Interpretation and Definitions</h2>
                <p>
                   The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Collecting and Using Your Personal Data</h2>
                <h3 className="text-xl text-white pt-2">Personal Data</h3>
                <p>
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                </ul>

                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Security of Your Personal Data</h2>
                <p>
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
                
                <h2 className="text-2xl text-white tracking-wider pt-6 border-b border-white/20 pb-2">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                <ul className="list-disc pl-5">
                    <li>By email: privacy@noirel.com</li>
                </ul>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
