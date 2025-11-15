import { useState } from 'react';
import { X, Check, MapPin, Clock, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderConfirmationProps {
  restaurant: {
    id: number;
    name: string;
    type: string;
    cuisine?: string;
    photo: string;
  };
  onClose: () => void;
  onConfirmOrder: (orderDetails: any) => void;
}

export function OrderConfirmation({ restaurant, onClose, onConfirmOrder }: OrderConfirmationProps) {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: 'Classic Burger', price: 8.99, quantity: 1 },
  ]);

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
  const total = subtotal + deliveryFee;

  const handleConfirm = () => {
    onConfirmOrder({
      restaurant,
      orderType,
      items: selectedItems,
      total,
      couponApplied: false, // This would be determined by active quest
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto" style={{ fontFamily: "'Baloo Tammudu 2', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <h2 className="text-xl">Order Confirmation</h2>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Restaurant Info */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={`https://source.unsplash.com/400x400/?${restaurant.photo}`}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{restaurant.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>0.8 mi away</span>
                <span className="mx-2">•</span>
                <Clock className="w-3 h-3 mr-1" />
                <span>15-25 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Type Toggle */}
        <div>
          <h3 className="font-bold mb-3">Order Type</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                orderType === 'pickup'
                  ? 'border-[#009de0] bg-[#009de0]/5 text-[#009de0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              <div className="font-bold">Pickup</div>
              <div className="text-xs">Ready in 15 min</div>
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                orderType === 'delivery'
                  ? 'border-[#009de0] bg-[#009de0]/5 text-[#009de0]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              <div className="font-bold">Delivery</div>
              <div className="text-xs">25-35 min</div>
            </button>
          </div>
        </div>

        {/* Order Items (Placeholder) */}
        <div>
          <h3 className="font-bold mb-3">Your Order</h3>
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={`https://source.unsplash.com/200x200/?${item.name}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-bold">${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add More Items Button */}
        <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#009de0] hover:text-[#009de0] transition-all">
          + Add More Items
        </button>

        {/* Quest Coupon Notice */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🎁</div>
            <div className="flex-1">
              <div className="font-bold text-sm mb-1">Quest Reward Available!</div>
              <div className="text-xs text-gray-700">
                Complete your order to earn your quest coupon. This restaurant will be added to your Food Journey!
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <h3 className="font-bold mb-3">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-[#009de0]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method (Placeholder) */}
        <div>
          <h3 className="font-bold mb-3">Payment Method</h3>
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="font-bold text-sm">Credit Card</div>
                <div className="text-xs text-gray-600">•••• 4242</div>
              </div>
            </div>
            <button className="text-sm text-[#009de0]">Change</button>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={handleConfirm}
          className="w-full bg-[#009de0] text-white py-4 rounded-xl flex items-center justify-center space-x-2 text-lg"
        >
          <Check className="w-6 h-6" />
          <span>Confirm Order • ${total.toFixed(2)}</span>
        </button>
        <p className="text-xs text-center text-gray-500 mt-2">
          This is a placeholder order confirmation page
        </p>
      </div>
    </div>
  );
}
