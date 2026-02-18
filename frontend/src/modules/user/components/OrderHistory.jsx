import InlineFeedback from "../../../components/InlineFeedback";

export default function OrderHistory({ orders, handleClearOrders, handleCancelOrder, feedback, onFeedbackClose }) {
  return (
    <>
      <div className="text-center mb-8 space-y-4">
        {orders.length > 0 && (
          <button
            onClick={handleClearOrders}
            className="border border-red-500/50 text-red-500 px-6 py-2 text-xs tracking-widest uppercase hover:bg-red-500/20 transition-colors"
          >
            Clear Order History
          </button>
        )}
        
        {/* Order Feedback */}
        {feedback && (
             <div className="max-w-md mx-auto">
                 <InlineFeedback {...feedback} onClose={onFeedbackClose} />
             </div>
        )}
      </div>

      <div className="space-y-8">
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-16 border border-white/10 rounded-lg">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          [...orders].reverse().map((order, index) => (
            <div key={order.date || index} className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-900">
                <div>
                  <p className="text-sm text-gray-400">ORDER PLACED</p>
                  <p className="text-white">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString("en-US", {
                      year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'Date not available'}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="text-sm text-gray-400">TOTAL</p>
                  <p className="text-xl font-serif text-white">${parseFloat(order.total_amount || 0).toFixed(2)}</p>

                  <div className="flex flex-col md:items-end gap-2 mt-2">
                      {/* Track Order (Dummy) */}
                      <button className="text-xs text-white border border-white/30 px-3 py-1 hover:bg-white/10 transition-colors uppercase tracking-wider">
                          Track Order
                      </button>

                      {/* Cancel Button */}
                      {order.status !== 'SHIPPED' && order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-xs text-red-500 border border-red-500/50 px-3 py-1 hover:bg-red-500/10 transition-colors uppercase tracking-wider"
                        >
                          Cancel Order
                        </button>
                      )}
                  </div>

                  {/* Payment ID Details */}
                  {order.payment_id && (
                    <p className="mt-2 text-xs text-gray-400">
                      Ref: <span className="text-gray-300 font-mono">{order.payment_id}</span>
                    </p>
                  )}

                  <p className={`mt-1 text-sm font-semibold ${
                    order.status === 'CANCELLED' ? 'text-red-500' :
                      order.status === 'DELIVERED' ? 'text-green-500' : 'text-blue-400'
                    }`}>
                    Status: {order.status}
                  </p>

                  {/* Refund Message */}
                  {order.status === 'CANCELLED' && (
                    <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
                      <p>Order cancelled. Refund is processing (5-7 days).</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 space-y-4">
                {order.items && order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    {(() => {
                        let imgUrl = "https://via.placeholder.com/64?text=No+Image";
                        if (item.product_image) {
                            if (item.product_image.startsWith("http")) {
                                imgUrl = item.product_image;
                            } else {
                                // removing /api from the end if present to get base URL
                                const baseUrl = import.meta.env.VITE_API_URL.endsWith('/api') 
                                    ? import.meta.env.VITE_API_URL.slice(0, -4) 
                                    : import.meta.env.VITE_API_URL;
                                // ensure leading slash
                                const path = item.product_image.startsWith("/") ? item.product_image : `/${item.product_image}`;
                                imgUrl = `${baseUrl}${path}`;
                            }
                        }
                        return (
                            <img
                              src={imgUrl}
                              alt={item.product_name || item.name}
                              className="w-16 h-16 object-cover rounded-md"
                              onError={(e) => { e.target.src = "https://via.placeholder.com/64?text=Error"; }} 
                            />
                        );
                    })()}

                    <div className="flex-grow">
                      <p className="font-semibold text-white">{item.product_name || item.name}</p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity || 1} · ${parseFloat(item.unit_price || 0).toFixed(2)} each
                      </p>
                    </div>
                    <p className="font-serif text-lg">
                      ${(parseFloat(item.unit_price || 0) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Shipping Details */}
              {order.shipping && (
                <div className="p-4 border-t border-white/10 text-sm text-gray-300 space-y-1">
                  <p><span className="font-semibold">Ship to:</span> {order.shipping?.fullName}</p>
                  <p>{order.shipping?.address},
                    {order.shipping?.city},
                    {order.shipping?.postalCode}</p>
                  <p>{order.shipping?.country}</p>
                  <p><span className="font-semibold">Payment:</span> {order.paymentMethod || 'N/A'} ({order.paymentId || 'N/A'})</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
