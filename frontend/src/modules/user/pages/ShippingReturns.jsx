import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function ShippingReturns() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white font-light pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl tracking-widest mb-12 text-center">Shipping & Returns</h1>
            
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl tracking-wider mb-4 border-b border-white/20 pb-2">Shipping Policy</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            At <strong>Essence Rare</strong>, we strive to deliver your order as quickly and safely as possible. We offer worldwide shipping to over 100 countries.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Standard Shipping:</strong> 5-7 business days ($15, or FREE on orders over $100).</li>
                            <li><strong>Express Shipping:</strong> 2-3 business days ($35).</li>
                            <li><strong>Overnight Shipping:</strong> Available for select locations ($50).</li>
                        </ul>
                        <p>
                            Please note that processing times may take 1-2 business days before your order is shipped. You will receive a tracking number via email once your package has been dispatched.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl tracking-wider mb-4 border-b border-white/20 pb-2">Returns & Exchanges</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            We want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within <strong>30 days</strong> of delivery.
                        </p>
                        <p>To be eligible for a return:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The item must be unused and in the same condition that you received it.</li>
                            <li>It must be in the original packaging (cellophane wrapper must be unopened for perfumes).</li>
                            <li>You must have the receipt or proof of purchase.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl tracking-wider mb-4 border-b border-white/20 pb-2">Refund Process</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                        </p>
                        <p>
                            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days (usually 5-10 business days).
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl tracking-wider mb-4 border-b border-white/20 pb-2">Damaged Items</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            We replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href="mailto:support@noirel.com" className="text-white underline">support@noirel.com</a>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
