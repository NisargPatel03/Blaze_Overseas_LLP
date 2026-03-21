"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RequestSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string; // If provided, shown as read-only. If not, shown as dropdown.
}

export default function RequestSampleModal({ isOpen, onClose, productName }: RequestSampleModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: productName || "",
    packing: "",
    packets: "",
    remarks: ""
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (productName) {
        setFormData(prev => ({ ...prev, product: productName }));
      }
    } else {
      document.body.style.overflow = "unset";
      // Reset state when closing
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          product: productName || "",
          packing: "",
          packets: "",
          remarks: ""
        });
      }, 300);
    }
  }, [isOpen, productName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sample request sent!</h3>
                <p className="text-gray-500">We&apos;ll contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Request a Free Sample</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    We&apos;ll dispatch your sample within 3-5 business days
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Full Name*</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Phone*</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Email*</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Product</label>
                      {productName ? (
                        <input
                          readOnly
                          type="text"
                          value={productName}
                          className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900 font-semibold cursor-not-allowed"
                        />
                      ) : (
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select a Product</option>
                          <option value="Whole Spices">Whole Spices</option>
                          <option value="Blended Masala">Blended Masala</option>
                          <option value="Grains">Grains</option>
                          <option value="Pulses">Pulses</option>
                          <option value="Not Sure Yet">Not Sure Yet</option>
                        </select>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Packing (grams)</label>
                        <input
                          type="number"
                          name="packing"
                          value={formData.packing}
                          onChange={handleInputChange}
                          placeholder="e.g. 100g"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">No. of Packets</label>
                        <input
                          type="number"
                          name="packets"
                          value={formData.packets}
                          onChange={handleInputChange}
                          placeholder="e.g. 5"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Remarks (Optional)</label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any specific requirements..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600/50 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-xl py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(180,83,9,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} /> Processing...
                      </>
                    ) : (
                      "Confirm Sample Order"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
