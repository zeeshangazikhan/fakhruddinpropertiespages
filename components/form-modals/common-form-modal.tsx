'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Import Portal
import { Download, Send, Calendar, X } from 'lucide-react';
import { ContactForm } from '../contact-form';

interface ModalProps {
  title: string;
  pdfUrl?: string;
}

export function Modal({ title, pdfUrl }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Handle Mounting (Prevent hydration errors with Portal)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 2. Lock Body Scroll when Modal Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Helper for Button Styles
  const getButtonContent = () => {
    if (title.toLowerCase().includes('download')) {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className="group cursor-pointer relative overflow-hidden justify-center bg-linear-to-r from-[#DAAA97] to-[#c99a87] hover:from-[#e5baa7] hover:to-[#d9aa97] text-white px-6 py-2 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider rounded-lg transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-[#DAAA97]/50 flex items-center gap-2 sm:gap-3"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            {title}
          </span>
          <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      );
    }

    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer relative justify-center overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/50 text-white hover:bg-white hover:text-[#334058] hover:border-white px-6 py-2 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider rounded-lg transform hover:scale-105 transition-all duration-500 shadow-2xl flex items-center gap-2 sm:gap-3"
      >
        <span className="relative z-10 flex items-center gap-2">
          {title.toLowerCase().includes('meeting') ? <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
          {title}
        </span>
      </button>
    );
  };

  // 3. The Modal Content (Rendered via Portal)
  const modalContent = isOpen ? (
    <div className="relative z-99999">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* SCROLL WRAPPER - This fixes the scrolling issue */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

          {/* MODAL PANEL */}
          <div
            className="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all sm:my-8 w-full max-w-lg animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>

            {/* Form Content */}
            <ContactForm
              isModal={true}
              title={title}
              pdfUrl={pdfUrl}
              onSuccess={() => setTimeout(() => setIsOpen(false), 3000)}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {getButtonContent()}
      {/* Portal moves the modal outside your current DOM hierarchy to document.body */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}