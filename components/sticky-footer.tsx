
"use client";
import '../styles/sticky-footer-custom.css';

import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { RegisterInterestModal } from './form-modals/register-interest-modal';
import { usePathname } from 'next/navigation';
import { Modal } from './form-modals/common-form-modal';

export default function StickyFooter() {
  const pathname = usePathname();

  // Always show the sticky footer, even at the top (hero section)
  const showFooter = true;

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full z-50 bg-[#18294a] text-white py-3 border-t border-[#18294a] transition-transform duration-300 ${showFooter ? "translate-y-0" : "translate-y-full"}`}
      style={{ willChange: 'transform' }}
    >
      <link rel="stylesheet" href="/styles/sticky-footer-custom.css" />
      {/* Floating WhatsApp and Call icons */}
      <div className="fixed right-0 bottom-32 md:bottom-48 z-50">
        <div
          className="flex flex-col items-center gap-3 md:gap-4 bg-[#18294a] px-1.5 py-2 md:px-2 md:py-4 rounded-l-2xl shadow-lg"
        >
          <a
            href="https://wa.me/9718005253"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 mb-1"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={26} className="text-[#eac2b1] md:text-[30px]" />
          </a>
          <a
            href="tel:+9718005253"
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 mb-1"
            aria-label="Call us"
          >
            <FaPhoneAlt size={20} className="text-[#eac2b1] md:text-[22px]" />
          </a>
        </div>
      </div>
      {/* Desktop (lg+) full footer with boxed layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-12 flex flex-row items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-12 flex-1 justify-start flex-wrap min-w-0">
            <div className="flex items-center mr-12 min-w-[180px]">
              <img
                src="/fakhruddin-logo.webp"
                alt="Fakhruddin Properties Logo"
                className="h-20 w-auto object-contain sticky-footer-logo"
                style={{ maxWidth: '260px' }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base sticky-footer-text"> <b>1, 2 & 4 BR </b> Wellness </span>
              <span className="font-normal text-base sticky-footer-text">Residences</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-normal text-base sticky-footer-text">Smart Home</span>
              <span className="font-bold text-base sticky-footer-text">Technology Enabled</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base sticky-footer-text"><b>Resort Living</b></span>
              <span className="font-normal text-base sticky-footer-text">Lifestyle Experience</span>
            </div>
          </div>
          {/* <RegisterInterestModal>
            <button className="bg-white text-[#10616C] font-bold px-6 py-3 rounded-none shadow-none border-none min-w-[180px] text-base whitespace-nowrap ml-4 sticky-footer-button">REGISTER INTEREST</button>
          </RegisterInterestModal> */}
          <Modal title="Register Interest" />
        </div>
      </div>
      {/* Mobile & Tablet: Only button, centered and boxed */}
      <div className="flex lg:hidden justify-center items-center w-full px-2">
        {/* <div className="w-full max-w-xs mx-auto"> */}
        <Modal title="Register Interest" />
        {/* </div> */}
      </div>
    </footer>
  );
}
