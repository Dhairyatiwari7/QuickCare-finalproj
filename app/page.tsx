"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useAuth } from "./contexts/AuthContext";
import { Heart, Activity, Stethoscope, Pill, Ambulance } from "lucide-react";
import EmergencySection from './components/EmergencySection';

// Particle Animation Component
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const particleCount = useRef(60);

  const config = {
    baseColor: [59, 130, 246] as const,
    maxParticleSize: 7,
    speedRange: 0.7,
    opacityRange: { min: 0.1, max: 0.6 },
    fadeEffect: 0.06,
    symbolScale: 4,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: particleCount.current }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    const createParticle = (width: number, height: number): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * config.maxParticleSize + 1,
      speedX: Math.random() * config.speedRange * 2 - config.speedRange,
      speedY: Math.random() * config.speedRange * 2 - config.speedRange,
      opacity: Math.random() * (config.opacityRange.max - config.opacityRange.min) + config.opacityRange.min,
    });

    const drawMedicalSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${config.baseColor.join(",")}, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.moveTo(x - size / 2, y);
      ctx.lineTo(x + size / 2, y);
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x, y + size / 2);
      ctx.stroke();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = `rgba(255, 255, 255, ${config.fadeEffect})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
        drawMedicalSymbol(ctx, particle.x, particle.y, particle.size * config.symbolScale, particle.opacity);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      style={{ mixBlendMode: "multiply" }}
      aria-hidden="true"
    />
  );
}

// Floating Icons Component
function FloatingIcon({ icon, delay, x, y }: { icon: React.ReactNode; delay: number; x: number; y: number }) {
  const iconRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.fromTo(
      iconRef.current,
      {
        opacity: 0.2,
        y: y,
        x: x,
      },
      {
        opacity: 0.5,
        y: y - 50,
        x: x + 30,
        duration: 5,
        delay,
        ease: "power1.inOut",
      }
    );

    return () => tl.kill();
  }, [delay, x, y]);

  return (
    <div ref={iconRef} className="absolute text-blue-500/20">
      {icon}
    </div>
  );
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingIcon icon={<Heart size={40} />} delay={0} x={100} y={100} />
      <FloatingIcon icon={<Activity size={48} />} delay={1} x={200} y={300} />
      <FloatingIcon icon={<Stethoscope size={56} />} delay={2} x={800} y={200} />
      <FloatingIcon icon={<Pill size={40} />} delay={1.5} x={700} y={400} />
      <FloatingIcon icon={<Ambulance size={48} />} delay={2.5} x={300} y={500} />
    </div>
  );
}

// Stats Card Component
function StatsCard({ number, text, delay }: { number: string; text: string; delay: number }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay,
    });
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-transform duration-300"
    >
      <h3 className="text-3xl font-bold text-blue-600 mb-2">{number}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

// Main HomePage Component
export default function HomePage() {
  const { user } = useAuth();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".hero-title", {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
    })
      .from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, "-=0.4")
      .from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, "-=0.4");

    return () => tl.kill();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-50" />
      <AnimatedBackground />
      <FloatingElements />
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to <span className="text-blue-600">QuickCare</span>
            </h1>
          </div>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-12">
            Your trusted healthcare companion for a healthier tomorrow
          </p>

          
          <div className="hero-buttons">
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {user ? (
                user.role === "doctor" ? (
                  <>
                    <Button asChild className="px-8 py-4 text-lg rounded-full">
                      <Link href="/doctor/appointments">View Appointments</Link>
                    </Button>
                    <Button asChild variant="outline" className="px-8 py-4 text-lg rounded-full">
                      <Link href="/ai-help">Get Help with AI</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild className="px-8 py-4 text-lg rounded-full">
                      <Link href="/consultation">Book Your Labtest</Link>
                    </Button>
                    <Button asChild variant="outline" className="px-8 py-4 text-lg rounded-full">
                      <Link href="/appointment">Book an Appointment</Link>
                    </Button>
                    <Button asChild variant="outline" className="px-8 py-4 text-lg rounded-full">
                      <Link href="/ai-help">Virtual Doctor</Link>
                    </Button>
                    <Button asChild variant="outline" className="px-8 py-4 text-lg rounded-full">
                      <Link href="/labreport">Lab Report Analyser</Link>
                    </Button>
                  </>
                )
              ) : (
                <Button asChild className="px-8 py-4 text-lg rounded-full">
                  <Link href="/login">Login / Sign Up</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <StatsCard number="1k+" text="Happy Patients" delay={0.3} />
            <StatsCard number="20+" text="Expert Doctors" delay={0.6} />
            <StatsCard number="24/7" text="Medical Care" delay={0.9} />
          </div>
          {user && user.role !== "doctor" && (
            <div className="mt-20">
              <EmergencySection />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}