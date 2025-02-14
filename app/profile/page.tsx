"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Edit2, Save, User } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  gender: string
  age: string
  bloodGroup: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    bloodGroup: "",
  })
  const [errors, setErrors] = useState<Partial<UserProfile>>({})

  const formRef = useRef(null)
  const bgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }

    // GSAP Animations
    gsap.fromTo(containerRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    // Animate medical symbols background
    const symbols = gsap.utils.toArray(".medical-symbol")
    gsap.to(symbols, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      stagger: {
        each: 2,
        from: "random",
      },
    })

    // Background texture animation
    gsap.to(bgRef.current, {
      backgroundPosition: "500% 0",
      duration: 100,
      repeat: -1,
      ease: "linear",
    })
  }, [])

  const validateForm = () => {
    const newErrors: Partial<UserProfile> = {}

    if (!profile.name.trim()) newErrors.name = "Name is required"
    if (!profile.phone.trim()) newErrors.phone = "Phone number is required"
    if (!profile.gender) newErrors.gender = "Gender is required"
    if (profile.phone && !/^\d{10}$/.test(profile.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check all required fields",
      })
      return
    }

    localStorage.setItem("userProfile", JSON.stringify(profile))
    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully",
    })

    // Save animation
    gsap.to(formRef.current, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8 relative overflow-hidden">
      {/* Animated Medical Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 overflow-hidden bg-[url('/medical-background.jpg')] bg-cover bg-center opacity-20"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="medical-symbol absolute text-blue-100 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
          >
            ⚕️
          </div>
        ))}
      </div>

      <div ref={containerRef} className="max-w-2xl mx-auto relative">
        <div
          ref={formRef}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100/20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-500">Manage your personal information</p>
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                disabled={!isEditing}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">
                Gender <span className="text-red-500">*</span>
              </Label>
              <Select
                value={profile.gender}
                onValueChange={(value) => setProfile({ ...profile, gender: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                disabled={!isEditing}
                min="0"
                max="120"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select
                value={profile.bloodGroup}
                onValueChange={(value) => setProfile({ ...profile, bloodGroup: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}