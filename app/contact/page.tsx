"use client"

import { useState } from "react"
import { Stethoscope, Pill, HeartPulse, Ambulance, Phone, Mail, Clock, Activity, Thermometer, Syringe, Send, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const resetForm = (form: HTMLFormElement | null) => {
    if (!form) return;
    
    try {
      // Safely reset the form
      form.reset();
      
      // Safely reset select elements
      const selects = form.querySelectorAll('select');
      selects?.forEach(select => {
        const selectTrigger = select.nextElementSibling?.querySelector('[data-value]');
        if (selectTrigger) {
          selectTrigger.textContent = 'Select...';
        }
      });

      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Error resetting form:', error);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your response! We will get back to you soon.'
        });
        resetForm(form);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: (error as Error).message || 'An error occurred while submitting the form.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same...
  const floatingIcons = [
    { Icon: Stethoscope, size: 48 },
    { Icon: Pill, size: 40 },
    { Icon: HeartPulse, size: 44 },
    { Icon: Ambulance, size: 46 },
    { Icon: Thermometer, size: 42 },
    { Icon: Syringe, size: 38 },
    { Icon: Activity, size: 45 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M60 30H0' stroke='%230000FF' fill='none'/%3E%3C/svg%3E")`, backgroundSize: "30px 30px", }} />
      
      {/* Floating Medical Icons */}
      {floatingIcons.map(({ Icon, size }, index) => (
        <div key={index} className="absolute text-blue-500/10 animate-float" style={{ left: `${Math.random() * 100}%`, animationDelay: `${index * 2}s`, top: `${Math.random() * 100}%`, }} >
          <Icon size={size} />
        </div>
      ))}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fadeIn">
          {submitStatus.type && (
            <Alert className={`mb-4 ${submitStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
              <AlertDescription className={submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
            Get in Touch
          </h1>
          <p className="text-center text-gray-600 mb-8">
            We're here to help with any medical inquiries or concerns
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, text: "+91 8409161643", label: "Call Us" },
              { icon: Mail, text: "quickcare@gmail.com", label: "Email Us" },
              { icon: Clock, text: "24/7 Emergency Support", label: "Available" },
            ].map(({ icon: Icon, text, label }, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-blue-50/50 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <Icon className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">{label}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4 animate-slideInLeft">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" /> Personal Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input name="name" required className="w-full" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input name="email" type="email" required className="w-full" placeholder="your.email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input name="phone" type="tel" className="w-full" placeholder="Your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Date</label>
                <Input name="preferredDate" type="date" className="w-full" />
              </div>
            </div>

            {/* Inquiry Details Section */}
            <div className="space-y-4 animate-slideInRight">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Inquiry Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <Select name="department">
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                <Select name="urgency">
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General Inquiry</SelectItem>
                    <SelectItem value="medium">Medium - Need Assistance</SelectItem>
                    <SelectItem value="high">High - Urgent Matter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input name="subject" required className="w-full" placeholder="Brief subject of your inquiry" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea name="message" required className="w-full min-h-[150px]" placeholder="Please provide detailed information about your inquiry..." />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center animate-fadeIn">
              <Button type="submit" className="w-full md:w-auto min-w-[200px] bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">
                      <HeartPulse size={18} />
                    </span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={18} />
                    Send Message
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}