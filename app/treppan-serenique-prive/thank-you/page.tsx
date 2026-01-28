"use client";
import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PDF_URL = '/Treppan-Tower-Brochure.pdf';

const ThankYouPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = PDF_URL;
      link.download = 'Treppan-Tower-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DAAA97]/5 rounded-[4px] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#334058]/5 rounded-[4px] blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="max-w-2xl w-full">
          <div
            className={`mb-8 flex justify-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
              }`}
          >
            <img
              src="/treppan-serenique-logo.webp"
              alt="Treppan Serenique"
              className="w-48 sm:w-56 md:w-64 object-contain"
            />
          </div>

          <div
            className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DAAA97]/30 to-[#334058]/30 rounded-full blur-2xl" />
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#DAAA97]/20 to-[#334058]/20 border-2 border-[#DAAA97]/50">
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-[#DAAA97] animate-pulse" />
              </div>
            </div>
          </div>

          <div
            className={`text-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              Thank You!
            </h1>

            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent mx-auto mb-8" />

            <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed font-light">
              We've received your inquiry and are excited to assist you on your journey to exceptional living.
            </p>

            <div className="bg-gradient-to-br from-[#DAAA97]/10 to-[#334058]/10 border border-[#DAAA97]/20 rounded-[4px] p-6 sm:p-8 mb-8">
              <p className="text-gray-600 mb-4 font-medium">
                {downloadStarted ? "Your brochure is downloading..." : "Getting your brochure ready..."}
              </p>
              <p className="text-sm text-gray-500">
                If the download doesn't start automatically, <a href={PDF_URL} download className="text-[#DAAA97] font-semibold hover:underline transition-all">
                  click here to download
                </a>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/eoi-treppan-living-prive">
                <button className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:border-[#DAAA97]/50 text-gray-900 px-8 py-4 text-sm sm:text-base font-semibold uppercase tracking-wider rounded-[4px] transform hover:scale-105 transition-all duration-500 w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Back to project
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#DAAA97] to-[#334058] -z-10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </Link>

              <a href={PDF_URL} download>
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#DAAA97] to-[#c99a87] hover:from-[#e5baa7] hover:to-[#d9aa97] text-white px-8 py-4 text-sm sm:text-base font-semibold uppercase tracking-wider rounded-[4px] transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-[#DAAA97]/50 flex items-center gap-2 w-full sm:w-auto">
                  <Download className="w-4 h-4" />
                  Download Brochure
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 -z-10" />
                </button>
              </a>
            </div>
          </div>

          <div
            className={`mt-16 pt-8 border-t border-gray-200 text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <p className="text-sm text-gray-500 mb-2">
              Have questions? Our team is here to help.
            </p>
            <p className="text-[#DAAA97] font-semibold">
              We look forward to connecting with you soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
