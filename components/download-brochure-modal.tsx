import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface DownloadBrochureModalProps {
  children?: React.ReactNode;
  pdfUrl?: string;
  headingText?: string;
}

export function DownloadBrochureModal({ 
  children, 
  pdfUrl, 
  headingText = "Download Brochure" 
}: DownloadBrochureModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const targetId = "hubspot-brochure-form-container";

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load HubSpot script once
  useEffect(() => {
    const scriptSrc = "//js.hsforms.net/forms/embed/v2.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.charset = "utf-8";
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Function to hide loader when form is ready
  const hideLoaderWhenFormReady = useCallback(() => {
    const container = document.getElementById(targetId);
    if (!container) return;

    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new MutationObserver((mutations, obs) => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        iframe.addEventListener('load', () => {
          setFormLoading(false);
        }, { once: true });
        obs.disconnect();
      }
    });

    observerRef.current.observe(container, {
      childList: true,
      subtree: true
    });
  }, []);



  // Create HubSpot form when modal opens
  const createHubSpotForm = useCallback(() => {
    if (!scriptLoaded) return;

    let retryCount = 0;
    function tryCreateForm() {
      if ((window as any).hbspt) {
        // Clear old form
        const formContainer = document.getElementById(targetId);
        if (formContainer) {
          formContainer.innerHTML = "";
        }

        // Store PDF URL in session storage if provided
        if (pdfUrl) {
          sessionStorage.setItem('selectedPdf', pdfUrl);
        }

        // Start observing for form ready
        hideLoaderWhenFormReady();

        // Create HubSpot form with onFormSubmitted callback
        (window as any).hbspt.forms.create({
          portalId: "49053274",
          formId: "4409cad0-4c2d-4fd2-9482-25315148f96f",
          region: "eu1",
          target: `#${targetId}`,
          redirectUrl: '', // Prevent redirect - stay on page
          onFormSubmit: function() {
            // This fires when submit button is clicked (before submission completes)
            console.log('Form submit clicked');
          },
          onFormSubmitted: function() {
            console.log('Form submitted successfully');
            
            // Fire Google Ads "Submit Lead Form" event
            if (typeof (window as any).gtag === 'function') {
              (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-17840114502/A1p3COiJ2tkbEMaW6rpC',
                'value': 1.0,
                'currency': 'AED'
              });
            }
            
            // Get PDF from session storage and download it
            const selectedPdf = sessionStorage.getItem('selectedPdf');
            if (selectedPdf) {
              // Create anchor element to force download
              const link = document.createElement('a');
              link.href = selectedPdf;
              link.target = '_blank';
              link.download = 'Treppan-Tower-Brochure.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              // Close modal after short delay
              setTimeout(() => {
                setIsModalOpen(false);
                document.body.style.overflow = "";
                sessionStorage.removeItem('selectedPdf');
              }, 500);
            }
          }
        });
      } else if (retryCount < 10) {
        retryCount++;
        setTimeout(tryCreateForm, 300);
      }
    }
    tryCreateForm();
  }, [scriptLoaded, pdfUrl, hideLoaderWhenFormReady]);

  const openModal = () => {
    setIsModalOpen(true);
    setFormLoading(true);
    document.body.style.overflow = "hidden";
    
    // Create form after a small delay to ensure DOM is ready
    setTimeout(() => {
      createHubSpotForm();
    }, 100);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    
    // Clear session storage
    sessionStorage.removeItem('selectedPdf');
    
    // Disconnect observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      sessionStorage.removeItem('selectedPdf');
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {/* Trigger Button */}
      {children ? (
        <span onClick={openModal} style={{ display: "inline-block", cursor: "pointer" }}>{children}</span>
      ) : (
        <Button onClick={openModal} size="lg" className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border-2 border-white/50 text-white hover:bg-white hover:text-[#334058] hover:border-white px-6 py-4 sm:px-10 sm:py-7 text-sm sm:text-base font-semibold uppercase tracking-wider rounded-[4px] transform hover:scale-105 transition-all duration-500 shadow-2xl">
          <span className="relative z-10 flex items-center gap-2 sm:gap-3">Download Brochure</span>
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
              className={`relative w-full max-w-[500px] bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 transform ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
              onClick={(e) => e.stopPropagation()}
            > 
              {/* Close Button */}
              <button 
                onClick={closeModal} 
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border-none text-gray-500 hover:text-gray-800 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Heading */}
              <h2 className="text-2xl text-center py-4 px-6 m-0 font-semibold text-gray-800">
                {headingText}
              </h2>

              {/* Loading Message */}
              <p 
                className={`text-center mb-5 text-gray-600 transition-opacity duration-400 ${formLoading ? 'opacity-100' : 'opacity-0 h-0 mb-0 overflow-hidden'}`}
              >
                Please wait...
              </p>

              {/* Form Body */}
              <div className="px-6 pb-6 max-h-[65vh] overflow-y-auto custom-scrollbar bg-white">
                <div 
                  id={targetId} 
                  ref={formContainerRef}
                  className="min-h-[300px] hubspot-form-container"
                ></div>
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
        
        /* HubSpot Form Styles */
        .hubspot-form-container input,
        .hubspot-form-container select {
          padding: 0 5px !important;
          color: #000 !important;
          border: 1px solid #d5d6de !important;
          font-size: 16px;
          border-radius: 8px;
          height: 45px;
          width: 100%;
        }
        
        .hubspot-form-container input:focus,
        .hubspot-form-container select:focus {
          outline: none;
          border-color: #daaa97 !important;
        }
        
        .hubspot-form-container button[type=submit],
        .hubspot-form-container input[type=submit] {
          width: 100%;
          color: #FFF !important;
          background: #daaa97 !important;
          border-color: #daaa97 !important;
          height: 45px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .hubspot-form-container button[type=submit]:hover,
        .hubspot-form-container input[type=submit]:hover {
          background: #c49a87 !important;
          border-color: #c49a87 !important;
        }
        
        .hubspot-form-container select {
          display: block !important;
          appearance: auto !important;
          -webkit-appearance: auto !important;
          -moz-appearance: auto !important;
          background-image: initial !important;
        }
        
        .hubspot-form-container p,
        .hubspot-form-container .hs-form-field {
          margin-bottom: 15px;
        }
        
        .hubspot-form-container .hs-error-msgs {
          font-size: 14px;
          color: #dc3545;
          margin-top: 5px;
        }
      `}</style>
    </>
  );
}
