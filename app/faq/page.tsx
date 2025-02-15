"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by navigating to the 'Book Appointment' section, selecting your preferred doctor, choosing an available time slot, and confirming your booking.",
  },
  {
    question: "What should I do if I need to cancel my appointment?",
    answer:
      "To cancel an appointment, go to 'My Appointments' in your profile, find the appointment you wish to cancel, and click the cancel button. Please try to cancel at least 24 hours in advance.",
  },
  {
    question: "How can I access my medical records?",
    answer:
      "Your medical records can be accessed through your profile under the 'Medical Records' section. All your past consultations, prescriptions, and test results are stored securely.",
  },
  {
    question: "How does the Lab Report Analyzer work?",
    answer:
      "Our Lab Report Analyzer uses advanced technology to interpret your lab results in simple terms. Upload your lab report, and the system will provide a detailed explanation of each parameter, highlight any abnormal values, and offer general health insights based on the results.",
  },
  {
    question: "How accurate is the Lab Report Analysis?",
    answer:
      "While our analyzer provides reliable insights, it's designed to be an educational tool and should not replace professional medical advice. Always consult with your healthcare provider for a complete interpretation of your results.",
  },
  {
    question: "How can I book a lab test?",
    answer:
      "To book a lab test, navigate to the 'Book Lab Test' section, select your required test(s), choose a convenient location and time slot, and complete the payment. You'll receive a confirmation email with your booking details.",
  },
  {
    question: "What should I do to prepare for my lab test?",
    answer:
      "Preparation requirements vary by test. Once you book your test, you'll receive specific instructions about fasting requirements, medications, and other preparations. Generally, it's recommended to fast for 8-12 hours before blood tests.",
  },
  {
    question: "How do virtual doctor consultations work?",
    answer:
      "Virtual consultations are conducted through our secure video platform. Book an appointment, and you'll receive a link to join the video call. Ensure you have a stable internet connection and a quiet environment for the consultation.",
  },
  {
    question: "What technical requirements do I need for a virtual consultation?",
    answer:
      "You'll need a device with a camera and microphone (smartphone, tablet, or computer), a stable internet connection, and our application installed. We recommend testing your setup before the appointment.",
  },
  {
    question: "How can I get a personalized diet plan?",
    answer:
      "Use our Diet Planner tool to create a customized plan. Fill out the questionnaire about your health goals, dietary preferences, allergies, and lifestyle. Our system will generate a tailored meal plan that you can adjust as needed.",
  },
  {
    question: "Can I modify my diet plan?",
    answer:
      "Yes, you can modify your diet plan anytime. Access the Diet Planner, make changes to your preferences or restrictions, and the system will update your meal recommendations accordingly.",
  },
  {
    question: "How do I share my medical reports with my doctor?",
    answer:
      "During virtual consultations, you can directly share your lab reports and medical documents through our secure platform. Simply upload the documents before or during the consultation, and your doctor will have immediate access.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "Yes, we take data security seriously. All your health information is encrypted and stored securely following healthcare privacy standards. Only authorized healthcare providers can access your medical information.",
  },
]

export default function FAQPage() {
  useEffect(() => {
    gsap.from(".faq-item", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    })
  }, [])

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 font-montserrat">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="faq-item">
            <AccordionTrigger className="font-montserrat">{faq.question}</AccordionTrigger>
            <AccordionContent className="font-merriweather">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}