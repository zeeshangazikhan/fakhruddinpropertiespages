"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Building2, DollarSign, Users, Briefcase, FileText, CheckCircle, Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { countryCodes } from "@/lib/country-code"
import { EOIFormContent, defaultEOIFormContent } from "@/lib/strapi"

interface EOIFormProps {
  content?: EOIFormContent;
}

export function EOIForm({ content }: EOIFormProps) {
  // Use provided content or fallback to defaults
  const eoiData = content || defaultEOIFormContent;
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showParty2, setShowParty2] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  
  // Form field states
  const [formData, setFormData] = useState({
    // Party 1
    name1: "",
    mobile1: "",
    email1: "",
    nationality1: "",
    passportNumber1: "",
    // Party 2
    name2: "",
    mobile2: "",
    email2: "",
    nationality2: "",
    passportNumber2: "",
    // Unit preferences
    unitType: "",
    unitNumber: "",
    downPayment: "",
    preferredUnit: "",
    // Sales Manager
    salesManager: "",
    // Agency (optional)
    agencyName: "",
    agentName: "",
    agentMobile: "",
  })
  
  // File upload states
  const [passport1, setPassport1] = useState<File | null>(null)
  const [passport2, setPassport2] = useState<File | null>(null)
  const [fileError1, setFileError1] = useState("")
  const [fileError2, setFileError2] = useState("")
  
  // Update form field
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Use salesManagers from Strapi or fallback to defaults
  const salesManagersList = eoiData.salesManagers?.filter(m => m.isActive !== false).map(m => m.name) || [
    "Ahmed Al Maktoum",
    "Sarah Johnson",
    "Mohammed Rashid",
    "Fatima Al Nahyan",
    "James Wilson",
    "Aisha Khan",
    "Omar Hassan",
    "Maria Garcia",
    "Ali Mahmoud",
    "Elena Petrova"
  ]

  // Use downPaymentOptions from Strapi or fallback
  const downPaymentOptions = eoiData.downPaymentOptions?.map(o => o.label) || ["100%", "50%", "20%"]
  
  // Use unitNumberOptions from Strapi or fallback
  const unitNumbers = eoiData.unitNumberOptions?.map(o => o.label) || ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setError: (error: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
    const maxSize = 1 * 1024 * 1024 // 1MB

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF, JPG, JPEG, PNG formats allowed")
      return
    }

    if (file.size > maxSize) {
      setError("File size must be less than 1MB")
      return
    }

    setError("")
    setFile(file)
  }

  const removeFile = (setFile: (file: File | null) => void) => {
    setFile(null)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setIsSubmitting(true)

    try {
      // Create FormData to handle both JSON and files
      const formDataObj = new FormData()
      
      // Add form fields
      formDataObj.append('name1', formData.name1)
      formDataObj.append('mobile1', formData.mobile1)
      formDataObj.append('email1', formData.email1)
      formDataObj.append('nationality1', formData.nationality1)
      formDataObj.append('passportNumber1', formData.passportNumber1)
      
      // Party 2 (if applicable)
      if (showParty2) {
        formDataObj.append('name2', formData.name2)
        formDataObj.append('mobile2', formData.mobile2)
        formDataObj.append('email2', formData.email2)
        formDataObj.append('nationality2', formData.nationality2)
        formDataObj.append('passportNumber2', formData.passportNumber2)
      }
      
      // Unit preferences
      formDataObj.append('unitType', formData.unitType || 'Not specified')
      formDataObj.append('unitNumber', formData.unitNumber || 'Not specified')
      formDataObj.append('downPayment', formData.downPayment || 'Not specified')
      formDataObj.append('preferredUnit', formData.preferredUnit || 'Not specified')
      formDataObj.append('salesManager', formData.salesManager || 'Not assigned')
      
      // Agency Information
      formDataObj.append('agencyName', formData.agencyName || 'N/A')
      formDataObj.append('agentName', formData.agentName || 'N/A')
      formDataObj.append('agentMobile', formData.agentMobile || 'N/A')
      
      // Metadata
      formDataObj.append('submittedAt', new Date().toLocaleString('en-AE', { 
        timeZone: 'Asia/Dubai',
        dateStyle: 'full',
        timeStyle: 'long'
      }))
      formDataObj.append('source', typeof window !== 'undefined' ? window.location.href : 'EOI Form')
      
      // Add files
      if (passport1) {
        formDataObj.append('passport1', passport1)
      }
      if (passport2 && showParty2) {
        formDataObj.append('passport2', passport2)
      }

      const response = await fetch('/api/send-eoi', {
        method: 'POST',
        body: formDataObj,
        // Don't set Content-Type header - browser will set it with boundary
      })

      if (!response.ok) {
        const text = await response.text().catch(() => null)
        let message = text || response.statusText || `Request failed ${response.status}`
        try {
          const parsed = text ? JSON.parse(text) : null
          if (parsed && parsed.message) message = parsed.message
        } catch { }
        setSubmitError(message)
        return
      }

      let result: any = null
      try {
        result = await response.json()
      } catch (err) {
        console.error('Submission error: invalid JSON response', err)
        setSubmitError('Invalid server response. Please try again.')
        return
      }

      if (result?.success) {
        router.push('/eoi-treppan-living-prive/thank-you')
      } else {
        setSubmitError(result?.message || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // EOI steps from Strapi or defaults
  const eoiSteps = eoiData.eoiSteps?.map(s => s.step) || []

  return (
    <section
      id="eoi-form"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-28 bg-gradient-to-br from-[#f7f5f2] via-white to-[#f3efe9] overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#DAAA97]/10 via-[#DAAA97]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#334058]/10 via-[#334058]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span style={{ animationDuration: '8s' }} className="bg-gradient-to-r from-[#334058] via-[#DAAA97] to-[#4a5d7a] bg-clip-text text-transparent tracking-tight max-w-3xl mx-auto block drop-shadow-[0_8px_30px_rgba(51,64,88,0.15)] animate-shimmer">
              {eoiData.sectionTitle}
            </span>
            <span className="mt-3 block h-1 w-36 bg-gradient-to-r from-transparent via-[#DAAA97] to-transparent rounded-full mx-auto opacity-90" />
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* Section 1: Interested Party */}
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#334058] to-[#4a5d7a] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">1. Interested Party</h3>
                      <p className="text-white/70 text-sm">Primary applicant details</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Interested Party 1 */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#DAAA97] flex items-center justify-center text-white font-bold text-sm">1</div>
                      <h4 className="text-lg font-semibold text-[#334058]">Interested Party 1</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name1" className="text-[#334058] font-medium">Name <span className="text-red-500">*</span></Label>
                        <Input id="name1" placeholder="Enter full name" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" required value={formData.name1} onChange={(e) => updateField('name1', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile1" className="text-[#334058] font-medium">Mobile Number <span className="text-red-500">*</span></Label>
                        <Input id="mobile1" type="tel" placeholder="+971 XX XXX XXXX" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" required value={formData.mobile1} onChange={(e) => updateField('mobile1', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email1" className="text-[#334058] font-medium">Email <span className="text-red-500">*</span></Label>
                        <Input id="email1" type="email" placeholder="email@example.com" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" required value={formData.email1} onChange={(e) => updateField('email1', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality1" className="text-[#334058] font-medium">Nationality <span className="text-red-500">*</span></Label>
                        <Select value={formData.nationality1} onValueChange={(value) => updateField('nationality1', value)}>
                          <SelectTrigger className="w-full border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.country}>
                                {country.flag} {country.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passport1" className="text-[#334058] font-medium">Passport Number <span className="text-red-500">*</span></Label>
                        <Input id="passport1" placeholder="Enter passport number" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" required value={formData.passportNumber1} onChange={(e) => updateField('passportNumber1', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#334058] font-medium">Upload Passport <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          {passport1 ? (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <FileText className="w-5 h-5 text-green-600" />
                              <span className="text-sm text-green-700 truncate flex-1">{passport1.name}</span>
                              <button type="button" onClick={() => removeFile(setPassport1)} className="text-red-500 hover:text-red-700">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#DAAA97] transition-colors">
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-500">PDF, JPG, PNG (Max 1MB)</span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, setPassport1, setFileError1)}
                              />
                            </label>
                          )}
                          {fileError1 && <p className="text-red-500 text-xs mt-1">{fileError1}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Party 2 Button */}
                  {!showParty2 && (
                    <button
                      type="button"
                      onClick={() => setShowParty2(true)}
                      className="w-full py-3 border-2 border-dashed border-[#DAAA97] rounded-xl text-[#DAAA97] font-medium hover:bg-[#DAAA97]/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Add Interested Party 2 (If Applicable)
                    </button>
                  )}

                  {/* Interested Party 2 */}
                  {showParty2 && (
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#334058] flex items-center justify-center text-white font-bold text-sm">2</div>
                          <h4 className="text-lg font-semibold text-[#334058]">Interested Party 2 <span className="text-gray-400 font-normal text-sm">(If Applicable)</span></h4>
                        </div>
                        <button type="button" onClick={() => setShowParty2(false)} className="text-red-500 hover:text-red-700 text-sm">
                          Remove
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name2" className="text-[#334058] font-medium">Name</Label>
                          <Input id="name2" placeholder="Enter full name" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" value={formData.name2} onChange={(e) => updateField('name2', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile2" className="text-[#334058] font-medium">Mobile Number</Label>
                          <Input id="mobile2" type="tel" placeholder="+971 XX XXX XXXX" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" value={formData.mobile2} onChange={(e) => updateField('mobile2', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email2" className="text-[#334058] font-medium">Email</Label>
                          <Input id="email2" type="email" placeholder="email@example.com" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" value={formData.email2} onChange={(e) => updateField('email2', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality2" className="text-[#334058] font-medium">Nationality</Label>
                          <Select value={formData.nationality2} onValueChange={(value) => updateField('nationality2', value)}>
                            <SelectTrigger className="w-full border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.country}>
                                  {country.flag} {country.country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passport2num" className="text-[#334058] font-medium">Passport Number</Label>
                          <Input id="passport2num" placeholder="Enter passport number" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" value={formData.passportNumber2} onChange={(e) => updateField('passportNumber2', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[#334058] font-medium">Upload Passport</Label>
                          <div className="relative">
                            {passport2 ? (
                              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <FileText className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-green-700 truncate flex-1">{passport2.name}</span>
                                <button type="button" onClick={() => removeFile(setPassport2)} className="text-red-500 hover:text-red-700">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#DAAA97] transition-colors">
                                <Upload className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-500">PDF, JPG, PNG (Max 1MB)</span>
                                <input
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e, setPassport2, setFileError2)}
                                />
                              </label>
                            )}
                            {fileError2 && <p className="text-red-500 text-xs mt-1">{fileError2}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Unit Preferences */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#DAAA97] to-[#c99b86] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">2. Unit Preferences</h3>
                      <p className="text-white/80 text-sm">Select your preferred options</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="downPayment" className="text-[#334058] font-medium">Preferred Down Payment <span className="text-red-500">*</span></Label>
                      <Select value={formData.downPayment} onValueChange={(value) => updateField('downPayment', value)}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          {downPaymentOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numUnits" className="text-[#334058] font-medium">Number of Units <span className="text-red-500">*</span></Label>
                      <Select value={formData.unitNumber} onValueChange={(value) => updateField('unitNumber', value)}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitNumbers.map((num) => (
                            <SelectItem key={num} value={num}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredUnit" className="text-[#334058] font-medium">Preferred Unit <span className="text-red-500">*</span></Label>
                      <Select value={formData.unitType} onValueChange={(value) => updateField('unitType', value)}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1BR">1 Bedroom</SelectItem>
                          <SelectItem value="2BR">2 Bedroom</SelectItem>
                          <SelectItem value="3BR">3 Bedroom</SelectItem>
                          <SelectItem value="Studio">Studio</SelectItem>
                          <SelectItem value="Penthouse">Penthouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: EOI Value */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#334058] to-[#4a5d7a] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">3. EOI Value</h3>
                      <p className="text-white/70 text-sm">Expression of Interest deposit amount</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="space-y-2">
                    <Label className="text-[#334058] font-medium">EOI Deposit</Label>
                    <div className="relative">
                      <Input 
                        value={eoiData.depositAmount}
                        disabled 
                        className="bg-gray-50 border-gray-200 text-[#334058] font-semibold pr-12"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{eoiData.depositDescription}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Sales Manager */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#DAAA97] to-[#c99b86] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">4. Fakhruddin Sales Manager</h3>
                      <p className="text-white/80 text-sm">Select your assigned sales manager</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="space-y-2">
                    <Label htmlFor="salesManager" className="text-[#334058] font-medium">Select Sales Manager <span className="text-red-500">*</span></Label>
                    <Select value={formData.salesManager} onValueChange={(value) => updateField('salesManager', value)}>
                      <SelectTrigger className="w-full border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]">
                        <SelectValue placeholder="Choose a sales manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {salesManagersList.map((manager) => (
                          <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Agency Information */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#334058] to-[#4a5d7a] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">5. Agency Information <span className="text-white/60 font-normal">(Optional)</span></h3>
                      <p className="text-white/70 text-sm">If applicable, provide agency details</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="agencyName" className="text-[#334058] font-medium">Agency Name</Label>
                      <Input id="agencyName" placeholder="Enter agency name" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agentName" className="text-[#334058] font-medium">Agent Name</Label>
                      <Input id="agentName" placeholder="Enter agent name" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agentMobile" className="text-[#334058] font-medium">Agent Mobile Number</Label>
                      <Input id="agentMobile" type="tel" placeholder="+971 XX XXX XXXX" className="border-gray-200 focus:border-[#DAAA97] focus:ring-[#DAAA97]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Information */}
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-gradient-to-br from-[#334058] via-[#3d4d6a] to-[#2c3a4f] rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden relative">
                <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#DAAA97]/20 rounded-full blur-3xl" />
                <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-[#DAAA97]/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#DAAA97]" />
                    Developer Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[#DAAA97] text-sm font-medium uppercase tracking-wider">Developer Name</p>
                        <p className="text-white text-lg font-semibold">{eoiData.developerName}</p>
                      </div>
                      <div>
                        <p className="text-[#DAAA97] text-sm font-medium uppercase tracking-wider">Developer Address</p>
                        <p className="text-white/90">{eoiData.developerAddress}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[#DAAA97] text-sm font-medium uppercase tracking-wider">Developer Tel. No.</p>
                        <p className="text-white/90">{eoiData.developerTel}</p>
                      </div>
                      <div>
                        <p className="text-[#DAAA97] text-sm font-medium uppercase tracking-wider">Developer Email</p>
                        <p className="text-white/90">{eoiData.developerEmail}</p>
                      </div>
                      <div>
                        <p className="text-[#DAAA97] text-sm font-medium uppercase tracking-wider">RERA Developer Number</p>
                        <p className="text-white text-lg font-semibold">{eoiData.reraNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EOI Process */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#DAAA97] to-[#c99b86] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">EOI Process</h3>
                      <p className="text-white/80 text-sm">Important information about the EOI process</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{eoiData.processDescription}</p>
                    <p>The EOI Deposit Cheque amount should be <strong>{eoiData.depositAmount.split(' ')[0]} {eoiData.depositAmount.split(' ')[1]}</strong>, which will not be deposited unless Interested Party confirms Unit Allocation and proceeds with property booking.</p>
                    <p>{eoiData.unitAllocationNote}</p>
                    <p>{eoiData.refundNote}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold text-[#334058] mb-4">EOI Steps</h4>
                    <ul className="space-y-3">
                      {eoiSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#DAAA97]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-4 h-4 text-[#DAAA97]" />
                          </div>
                          <span className="text-gray-600 text-sm sm:text-base">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#334058] to-[#4a5d7a] p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">EOI Terms and Conditions</h3>
                      <p className="text-white/70 text-sm">Please read carefully before submitting</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 max-h-64 overflow-y-auto text-gray-600 text-sm leading-relaxed space-y-4 mb-6">
                    <p>The Developer has called any interested person/s or company (the "Interested Party") to reserve and later purchase some of the proposed properties within the Project, the parties will then proceed to a formal booking form/sale and purchase agreement. The full terms and conditions for the purchase and ownership of the Property will be contained in the sale and purchase agreement with related documents as may be required under relevant Dubai laws (together the "SPA"). The SPA will contain (or be subject to) usual rights and obligations.</p>
                    
                    <p>The information mentioned above is not an offer or a contract and does not constitute an interest in land. The purpose of this EOI is to provide the Developer's customers with an opportunity to express an interest within the Project prior to the official launch.</p>
                    
                    <p>The completion and submission of this EOI (and the EOI Amount) in no way obligates the Developer to sell the Property to the Purchaser.</p>
                    
                    <p>The Developer reserves the right to negotiate with only those interested parties that the Developer determines in its sole discretion. The Developer reserves the right to amend or cancel this EOI at any time prior to entering into a formal booking form/SPA without the requirement for a court order and/or any other formality. In the event that this EOI is cancelled by the Developer, the cheque for the EOI Amount shall be returned to the Interested Party as soon as reasonably practicable.</p>
                    
                    <p>The Interested Party reserves the right to cancel this EOI at any time prior to entering into a formal booking form/SPA without the requirement for a court order and/or any other formality. In the event that this EOI is cancelled by the Interested Party, the cheque for the EOI Amount shall be returned to the Interested Party as soon as reasonably practicable.</p>
                    
                    <p>The EOI Amount is provided to confirm the Interested Party's interest in the Property only and is not intended to be used to complete or fund the Project.</p>
                    
                    <p>This EOI is personal to the Interested Party and is not assignable or transferable and the Interested Party may not at any time assign its rights and obligations under this EOI to any third party without the express written consent of the Developer.</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-1 border-[#DAAA97] data-[state=checked]:bg-[#DAAA97] data-[state=checked]:border-[#DAAA97]"
                    />
                    <Label htmlFor="terms" className="text-[#334058] cursor-pointer">
                      I have read and agree to the terms and conditions stated above. <span className="text-red-500">*</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className={`transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                  {submitError}
                </div>
              )}
              <Button
                type="submit"
                disabled={!agreedToTerms || isSubmitting}
                className="w-full py-6 sm:py-7 text-lg sm:text-xl font-bold uppercase tracking-wider bg-gradient-to-r from-[#DAAA97] to-[#c99b86] hover:from-[#c99b86] hover:to-[#DAAA97] text-white rounded-2xl shadow-xl shadow-[#DAAA97]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Expression of Interest"
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
