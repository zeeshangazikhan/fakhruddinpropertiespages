import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

export function BookMeetingModal({ children }: { children?: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formCreated, setFormCreated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const targetId = "hubspot-meeting-form-container";

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load HubSpot script once
  useEffect(() => {
    const scriptSrc = "https://js.hsforms.net/forms/v2.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Create HubSpot form once script is loaded, with retry if hbspt is not ready
  useEffect(() => {
    let retryCount = 0;
    function tryCreateForm() {
      if (scriptLoaded && !formCreated) {
        if ((window as any).hbspt) {
          (window as any).hbspt.forms.create({
            region: "na1",
            portalId: "49053274",
            formId: "afc90f6a-759d-44b9-9420-38e62a1ee22a",
            target: `#${targetId}`,
          });
          setFormCreated(true);
        } else if (retryCount < 10) {
          retryCount++;
          setTimeout(tryCreateForm, 300);
        }
      }
    }
    tryCreateForm();
  }, [scriptLoaded, formCreated]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  // Clean up body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Trigger Button */}
      {children ? (
        <span onClick={openModal} style={{ display: "inline-block", cursor: "pointer" }}>{children}</span>
      ) : (
        <Button onClick={openModal} size="lg" className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/50 text-white hover:bg-white hover:text-[#334058] hover:border-white px-6 py-4 sm:px-10 sm:py-7 text-sm sm:text-base font-semibold uppercase tracking-wider rounded-lg transform hover:scale-105 transition-all duration-500 shadow-2xl">
          <span className="relative z-10 flex items-center gap-2 sm:gap-3">Book a Meeting</span>
        </Button>
      )}

      {/* Backdrop and Modal rendered via Portal for full viewport coverage */}
      {mounted && createPortal(
        <>
          {/* Backdrop - Full screen overlay */}
          <div 
            className={`fixed inset-0 z-[99999] bg-[#000000b3] transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={closeModal}
          ></div>
          {/* Modal wrapper */}
          <div className={`fixed inset-0 z-[100000] flex items-center justify-center p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}> 
            {/* Modal Container */}
            <div 
              className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
              onClick={(e) => e.stopPropagation()}
            > 
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-slate-800 to-slate-700">
                <div>
                  <h2 className="text-xl font-bold text-white">Book a Meeting</h2>
                  <p className="text-sm text-slate-300">Schedule a call with our team.</p>
                </div>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Form Body */}
              <div className="p-6 max-h-[65vh] overflow-y-auto custom-scrollbar bg-white">
                {!scriptLoaded && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-700 mb-4"></div>
                    <p className="text-gray-500 animate-pulse text-sm">Loading Form...</p>
                  </div>
                )}
                <div id={targetId} className="min-h-[350px]"></div>
              </div>
              {/* Footer */}
              <div className="px-6 py-3 bg-slate-50 text-center border-t border-gray-100">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  🔒 All data is processed securely
                </span>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
