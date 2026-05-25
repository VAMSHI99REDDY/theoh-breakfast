import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../ui/QuantitySelector';
import { CheckoutForm } from '../checkout/CheckoutForm';
import { formatINR } from '../../utils/currency';

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    changeCartItemQty,
    removeFromCart,
    totalCartPrice,
    clearCart,
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    timeSlot: '8:00 AM - 9:00 AM',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (
      !/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))
    ) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;

    alert('Proceeding to Payment');

    clearCart();
    setIsCartOpen(false);
    setCheckoutMode(false);

    setFormData({
      name: '',
      phone: '',
      address: '',
      timeSlot: '8:00 AM - 9:00 AM',
      notes: '',
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsCartOpen(false);
              setCheckoutMode(false);
            }}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-theoh-beige z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-theoh-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-theoh-brown">
                <ShoppingBag
                  size={20}
                  className="text-[#004700]"
                />
                <h2 className="text-lg font-black uppercase tracking-wide">
                  Your Cart
                </h2>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutMode(false);
                }}
                className="p-1.5 rounded-full hover:bg-theoh-beige transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <ShoppingBag
                      size={34}
                      className="text-[#004700]"
                    />
                  </div>

                  <h3 className="mt-4 font-black text-lg text-theoh-brown">
                    Your cart is empty
                  </h3>

                  <p className="text-sm text-theoh-muted mt-2 max-w-[250px] leading-relaxed">
                    Build your healthy breakfast bowl with oats,
                    fruits, nuts, and seeds.
                  </p>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-5 bg-[#004700] hover:bg-[#003300] text-white px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    Build Breakfast
                  </button>
                </div>
              ) : (
                <>
                  {!checkoutMode ? (
                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const basePrice = item.base.price;

                        const addonsPrice = item.addons.reduce(
                          (sum, addon) => sum + addon.price,
                          0
                        );

                        const itemPrice =
                          (basePrice + addonsPrice) * item.qty;

                        return (
                          <div
                            key={item.id}
                            className="bg-white p-4 rounded-2xl border border-theoh-border/50 shadow-sm flex gap-4"
                          >
                            {/* Image */}
                            <div
                              className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                              style={{
                                backgroundImage: `url(${item.base.image})`,
                              }}
                            />

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-2">
                                <div>
                                  <h4 className="font-black text-theoh-brown text-base leading-tight">
                                    {item.base.name}
                                  </h4>

                                  {item.addons.length > 0 ? (
                                    <p className="text-sm text-theoh-muted mt-1 leading-relaxed">
                                      +{' '}
                                      {item.addons
                                        .map((a) => a.name)
                                        .join(', ')}
                                    </p>
                                  ) : (
                                    <p className="text-xs uppercase tracking-wide text-theoh-muted mt-1">
                                      No add-ons selected
                                    </p>
                                  )}
                                </div>

                                <button
                                  onClick={() =>
                                    removeFromCart(item.id)
                                  }
                                  className="text-red-400 hover:text-red-600 transition-all"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>

                              {/* Bottom */}
                              <div className="flex justify-between items-center mt-4 pt-4 border-t border-theoh-border/20">
                                <QuantitySelector
                                  quantity={item.qty}
                                  onChange={(newQty) =>
                                    changeCartItemQty(
                                      item.id,
                                      newQty - item.qty
                                    )
                                  }
                                  size="sm"
                                />

                                <span className="font-black text-[#004700] text-xl">
                                  {formatINR(itemPrice)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={() =>
                          setCheckoutMode(false)
                        }
                        className="text-sm font-bold text-[#004700]"
                      >
                        ← Back to Cart Items
                      </button>

                      <CheckoutForm
                        formData={formData}
                        onChange={handleInputChange}
                        errors={errors}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom Summary */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-theoh-border/40 p-4 space-y-3">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-theoh-muted">
                    <span>Order Subtotal</span>

                    <span className="font-semibold text-theoh-brown">
                      {formatINR(totalCartPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-theoh-muted">
                    <span>Morning Delivery</span>

                    <span className="font-semibold text-[#004700]">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-theoh-border/20">
                    <span className="font-black text-xl text-theoh-brown">
                      Grand Total
                    </span>

                    <span className="font-black text-2xl text-[#004700]">
                      {formatINR(totalCartPrice)}
                    </span>
                  </div>
                </div>

                {/* Button */}
                {!checkoutMode ? (
                  <button
                    onClick={() => setCheckoutMode(true)}
                    className="w-full bg-[#004700] hover:bg-[#003300] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Proceed to Delivery Info</span>

                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#004700] hover:bg-[#003300] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Continue Payment</span>

                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}