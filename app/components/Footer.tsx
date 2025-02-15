"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Plus } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Create floating plus signs
    const plusSigns = gsap.utils.toArray(".medical-plus")
    plusSigns.forEach((plus: any) => {
      gsap.to(plus, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "none",
      })
    })

    // Animate content on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })

    tl.from(".footer-content > div", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    })

    // Hover animations for social icons
    const socialIcons = document.querySelectorAll(".social-icon")
    socialIcons.forEach((icon: any) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Contact items hover effect
    const contactItems = document.querySelectorAll(".contact-item")
    contactItems.forEach((item: any) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-gray-900/95 to-gray-900 text-white py-16 mt-12 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(13, 17, 23, 0.95), rgba(13, 17, 23, 0.98)),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234299e1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Floating medical plus signs */}
      {[...Array(12)].map((_, i) => (
        <Plus
          key={i}
          className="medical-plus absolute text-blue-500/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
        />
      ))}

      <div ref={containerRef} className="footer-content max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Section - Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <Heart className="text-blue-400 transition-transform duration-500 ease-out group-hover:scale-125" />
              <h2 className="text-2xl font-bold relative">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  QuickCare
                </span>
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 ease-out" />
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed hover:text-gray-300 transition-colors duration-300">
              Your trusted healthcare companion, providing compassionate care when you need it most.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-400" />
            </h3>
            <ul className="space-y-3">
  {[
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Book Appointment", path: "/appointment" },
    { name: "Book Lab Test", path: "/consultation" },
    { name: "Contact Us", path: "/contact" },
  ].map(({ name, path }) => (
    <li key={name}>
      <Link
        href={path}
        className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group"
      >
        <span className="h-[1px] w-0 bg-blue-400 group-hover:w-6 transition-all duration-300" />
        {name}
      </Link>
    </li>
  ))}
</ul>

          </div>

          {/* Right Section - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-300 relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-blue-400" />
            </h3>
            <div className="space-y-3">
              <div className="contact-item flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer group">
                <span className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <MapPin size={18} className="text-blue-400" />
                </span>
                Chengal Pattu, Vandalur,Chennai
              </div>
              <div className="contact-item flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer group">
                <span className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Phone size={18} className="text-blue-400" />
                </span>
                +91 8409161643
              </div>
              <div className="contact-item flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer group">
                <span className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Mail size={18} className="text-blue-400" />
                </span>
                quickcare@gmail.com
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="social-icon text-gray-300 hover:text-blue-400 transition-colors duration-300 bg-blue-500/10 p-3 rounded-lg hover:bg-blue-500/20"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-6">
          <p className="hover:text-blue-400 transition-colors duration-300">
            © {new Date().getFullYear()} QuickCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}