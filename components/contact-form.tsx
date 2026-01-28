// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Phone, Mail, MessageSquare, Building2, Sparkles } from "lucide-react"

// export function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     investmentType: "",
//     propertyType: "",
//     message: "",
//   })

//   useEffect(() => {
//     const scriptId = "hsforms-developer-script"
//     if (!document.getElementById(scriptId)) {
//       const script = document.createElement("script")
//       script.src = "https://js.hsforms.net/forms/embed/developer/49053274.js"
//       script.defer = true
//       script.id = scriptId
//       document.body.appendChild(script)
//     }
//   }, [])

//   return (
// <section className="py-24 md:py-32 bg-linear-to-br from-[#1a2332] via-[#2c3e50] to-[#34495e] relative overflow-hidden">
//   <div
//     className="absolute inset-0 opacity-10"
//     style={{
//       backgroundImage: "url('/modern-luxury-apartment-building-exterior-at-night.jpg')",
//       backgroundSize: 'cover',
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'center center',
//     }}
//   />

//   <div className="absolute inset-0 opacity-30">
//     <div className="absolute top-20 right-20 w-96 h-96 bg-[#DAAA97] rounded-lg blur-3xl animate-float" />
//     <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#334058] rounded-lg blur-3xl animate-float-delayed" />
//   </div>

//   <div
//     className="absolute inset-0 opacity-5"
//     style={{
//       backgroundImage:
//         "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
//       backgroundSize: "100px 100px",
//     }}
//   />

//       <div className="container mx-auto px-4 md:px-6 relative z-10">
//         <div className="max-w-2xl mx-auto">
//           <div className="text-center mb-12 md:mb-16">
//             <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-3 rounded-lg bg-[#DAAA97]/10 border border-[#DAAA97]/20 mb-4 sm:mb-6">
//             <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#DAAA97]" />
//             <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#DAAA97] font-bold">Get In Touch</p>
//           </div>

//             <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold text-white mb-3 sm:mb-4 leading-tight px-4">
//               Request Call Back
//             </h2>
//             <p className="text-white/70 text-sm sm:text-base md:text-lg px-4">
//               Our team will contact you within 24 hours
//             </p>
//           </div>

//           <div className="bg-[#1b2946] backdrop-blur-md rounded-lg p-6 md:p-10 shadow-2xl border border-white/20">
//             <div>
//               <div
//                 id="hs-form-embed"
//                 className="hs-form-html"
//                 data-region="na1"
//                 data-form-id="09a128eb-2ba8-4163-b316-9d7e8d6a07cb"
//                 data-portal-id="49053274"
//               />
//             </div>
//           </div>

//           <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-white/70 text-xs md:text-sm">
//             {["🔒 Secure & Confidential", "⚡ Quick Response", "🎯 Expert Guidance"].map((badge, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 {badge}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Loader2, CheckCircle, AlertCircle, Sparkles, ChevronDown, Search } from 'lucide-react';
import { countryCodes } from '@/lib/country-code';

interface ContactFormProps {
  isModal?: boolean;
  title?: string;
  pdfUrl?: string;
  onSuccess?: () => void;
}

export function ContactForm({ isModal = false, title, pdfUrl, onSuccess }: ContactFormProps) {
  // --- HUBSPOT CONFIGURATION ---
  const PORTAL_ID = "49053274";
  const FORM_ID = "4409cad0-4c2d-4fd2-9482-25315148f96f";
  const PERSONA_FIELD_NAME = "sales_contact_type";

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    persona: ''
  });

  const [countryCode, setCountryCode] = useState('+971');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Dropdown States
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [personaSearch, setPersonaSearch] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  // Refs for click outside closing
  const personaRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setIsPersonaOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- DATA LISTS ---
  // const countryCodes = [
  //   { code: '+971', flag: '🇦🇪', name: 'UAE' },
  //   { code: '+91', flag: '🇮🇳', name: 'India' },
  //   { code: '+1', flag: '🇺🇸', name: 'USA' },
  //   { code: '+44', flag: '🇬🇧', name: 'UK' },
  //   { code: '+966', flag: '🇸🇦', name: 'KSA' },
  // ];

  const personas = ["Buyer", "Broker"];

  const filteredPersonas = personas.filter(p =>
    p.toLowerCase().includes(personaSearch.toLowerCase())
  );

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const fullMobile = `${countryCode}${formData.phone}`;
    const contextMessage = title ? `Source: ${title} Modal` : 'Source: Website Contact Form';

    const hubspotPayload = {
      fields: [
        { name: "firstname", value: formData.name },
        { name: "email", value: formData.email },
        { name: "phone", value: fullMobile },
        { name: PERSONA_FIELD_NAME, value: formData.persona },
        { name: "message", value: contextMessage }
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    };

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotPayload)
        }
      );

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', persona: '' });

        // --- PDF DOWNLOAD LOGIC ---
        if (pdfUrl) {
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.target = '_blank';
          link.download = pdfUrl.split('/').pop() || 'brochure.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        if (onSuccess) onSuccess();

      } else {
        const errorData = await response.json();
        console.error("HubSpot Error", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission Error", error);
      setStatus('error');
    }
  };

  // --- STYLES ---
  const inputBaseStyle = "w-full bg-white text-gray-900 text-sm rounded-md h-12 px-4 focus:ring-2 focus:ring-[#c4a682] focus:outline-none transition-all placeholder:text-gray-400";
  const labelStyle = "block mb-2 text-sm font-medium text-white ml-1";

  // --- FORM UI (Defined as a variable, NOT a component, to prevent focus loss) ---
  const formContent = (
    <div className={`bg-[#1b2946]/90 backdrop-blur-xl border border-white/10 shadow-2xl ${isModal ? 'p-6 rounded-xl' : 'p-8 md:p-10 rounded-2xl'}`}>

      {/* Header */}
      <div className="text-center mb-8">
        {!isModal && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DAAA97]/10 border border-[#DAAA97]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#DAAA97]" />
            <p className="text-xs font-bold tracking-widest text-[#DAAA97] uppercase">Get In Touch</p>
          </div>
        )}
        <h2 className={`font-bold text-white mb-3 ${isModal ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>
          {title || "Request Call Back"}
        </h2>
        <p className="text-white/70 text-sm md:text-base">Our team will contact you within 24 hours</p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50/10 border border-green-500/30 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-green-400 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
          <p className="text-gray-300 text-sm">
            {pdfUrl ? "Your download should start automatically." : "Thank you for your interest. An expert will be in touch shortly."}
          </p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-[#DAAA97] hover:text-white transition-colors">
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className={labelStyle}>Name <span className="text-red-400">*</span></label>
            <input name="name" value={formData.name} onChange={handleChange} className={inputBaseStyle} placeholder="Your Full Name" required />
          </div>

          {/* Email Field */}
          <div>
            <label className={labelStyle}>Email <span className="text-red-400">*</span></label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className={inputBaseStyle} placeholder="name@example.com" required />
          </div>

          {/* Mobile Field */}
          <div>
            <label className={labelStyle}>Mobile <span className="text-red-400">*</span></label>
            <div className="flex gap-2" ref={countryRef}>
              <div className="relative w-40">
                <button type="button" onClick={() => setIsCountryOpen(!isCountryOpen)} className="w-full h-12 bg-white text-gray-900 rounded-md px-3 flex items-center justify-between focus:ring-2 focus:ring-[#c4a682]">
                  <span className="flex items-center gap-2 text-sm">
                    <span>{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                    <span>{countryCode}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCountryOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg z-50 py-1 max-h-48 overflow-auto">
                    {countryCodes.map((item) => (
                      <button key={`${item.code}-${item.country}`} type="button" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2" onClick={() => { setCountryCode(item.code); setIsCountryOpen(false); }}>
                        <span>{item.flag}</span>
                        <span className="font-medium">{item.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputBaseStyle} placeholder="50 123 4567" required />
            </div>
          </div>

          {/* Persona Dropdown */}
          <div ref={personaRef} className="relative">
            <label className={labelStyle}>Are you a <span className="text-red-400">*</span></label>
            <button type="button" onClick={() => setIsPersonaOpen(!isPersonaOpen)} className={`w-full h-12 bg-white text-left px-4 rounded-md flex items-center justify-between focus:ring-2 focus:ring-[#c4a682] ${!formData.persona ? 'text-gray-400' : 'text-gray-900'}`}>
              <span className="text-sm">{formData.persona || "Select an option"}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isPersonaOpen ? 'rotate-180' : ''}`} />
            </button>
            {isPersonaOpen && (
              <div className="absolute cursor-pointer top-full left-0 w-full mt-1 bg-white rounded-md shadow-xl z-50 p-2">
                {/* <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input autoFocus type="text" className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800 focus:outline-none focus:border-[#c4a682]" placeholder="Search..." value={personaSearch} onChange={(e) => setPersonaSearch(e.target.value)} />
                </div> */}
                <div className="max-h-48 overflow-y-auto cursor-pointer">
                  {filteredPersonas.length > 0 ? (
                    filteredPersonas.map((role) => (
                      <button key={role} type="button" className="w-full cursor-pointer text-left px-3 py-2 text-sm text-gray-700 hover:bg-[#c4a682]/10 hover:text-[#c4a682] rounded transition-colors" onClick={() => { setFormData({ ...formData, persona: role }); setIsPersonaOpen(false); }}>{role}</button>
                    ))
                  ) : (<div className="px-3 py-2 text-sm text-gray-400 text-center">No options found</div>)}
                </div>
              </div>
            )}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-200 bg-red-900/50 border border-red-500/30 p-3 rounded-lg text-sm">
              <AlertCircle size={18} /> <span>Something went wrong. Please try again.</span>
            </div>
          )}

          <button type="submit" disabled={status === 'loading'} className="w-full h-12 bg-[#c4a682] hover:bg-[#b09371] text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-[#c4a682]/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4">
            {status === 'loading' ? <><Loader2 className="animate-spin" /> Processing...</> : (title?.includes('Download') ? 'Download Now' : 'Submit Request')}
          </button>
        </form>
      )}
    </div>
  );

  // If used as a Modal, return just the form content
  if (isModal) return formContent;

  // If used as a standalone section, return with section wrapper
  return (
    <section className="py-24 md:py-32 bg-linear-to-br from-[#1a2332] via-[#2c3e50] to-[#34495e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/modern-luxury-apartment-building-exterior-at-night.jpg')", backgroundSize: 'cover', backgroundPosition: 'center center' }} />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#DAAA97] rounded-lg blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#334058] rounded-lg blur-3xl animate-float-delayed" />
      </div>
      <div className="relative z-10 px-4 container mx-auto max-w-2xl">
        {formContent}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-white/50 text-xs md:text-sm font-medium">
          {["🔒 Secure & Confidential", "⚡ Quick Response", "🎯 Expert Guidance"].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">{badge}</div>
          ))}
        </div>
      </div>
    </section>
  );
}