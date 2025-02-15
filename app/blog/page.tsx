"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Healthcare: Revolutionizing Patient Care",
    excerpt:
      "Explore how artificial intelligence is transforming healthcare delivery and improving patient outcomes through early disease detection, personalized treatment plans, and automated administrative tasks...",
    category: "AI & Healthcare",
    readTime: "8 min read",
    date: "2024-02-07",
  },
  {
    id: 2,
    title: "Understanding mRNA Technology: Beyond COVID-19 Vaccines",
    excerpt: "Dive deep into the revolutionary mRNA technology and its potential applications in modern medicine, from cancer treatment to rare disease therapies...",
    category: "Medical Science",
    readTime: "10 min read",
    date: "2024-02-06",
  },
  {
    id: 3,
    title: "Digital Therapeutics: The New Frontier in Mental Health Treatment",
    excerpt: "Discover how prescription digital therapeutics are revolutionizing mental health treatment through evidence-based software applications and virtual reality therapy...",
    category: "Mental Health",
    readTime: "7 min read",
    date: "2024-02-05",
  },
  {
    id: 4,
    title: "CRISPR Gene Editing: Latest Breakthroughs in Genetic Medicine",
    excerpt: "Explore recent advances in CRISPR technology and its promising applications in treating genetic disorders, cancer, and chronic diseases...",
    category: "Genetic Medicine",
    readTime: "12 min read",
    date: "2024-02-04",
  },
  {
    id: 5,
    title: "Wearable Health Tech: Beyond Step Counting",
    excerpt: "Learn about the latest developments in wearable medical devices, from continuous glucose monitoring to early warning systems for heart conditions...",
    category: "Medical Technology",
    readTime: "9 min read",
    date: "2024-02-03",
  },
  {
    id: 6,
    title: "Precision Medicine: Tailoring Treatment to Your Genetic Profile",
    excerpt: "Understanding how genetic testing and biomarker analysis are enabling personalized treatment plans and revolutionizing disease management...",
    category: "Personalized Medicine",
    readTime: "11 min read",
    date: "2024-02-02",
  },
  {
    id: 7,
    title: "Telemedicine Evolution: Virtual Care in 2024",
    excerpt: "Explore how telemedicine has evolved with AI diagnostics, remote monitoring, and virtual reality consultations, making healthcare more accessible than ever...",
    category: "Digital Health",
    readTime: "8 min read",
    date: "2024-02-01",
  },
  {
    id: 8,
    title: "Gut Microbiome: The Second Brain Revolution",
    excerpt: "New research reveals the crucial role of gut bacteria in mental health, immune function, and overall wellness. Learn about the latest therapeutic approaches...",
    category: "Medical Research",
    readTime: "10 min read",
    date: "2024-01-31",
  },
  {
    id: 9,
    title: "Immunotherapy Breakthroughs: New Hope in Cancer Treatment",
    excerpt: "Discover the latest advances in cancer immunotherapy, including CAR-T cell therapy improvements and novel immune checkpoint inhibitors...",
    category: "Oncology",
    readTime: "13 min read",
    date: "2024-01-30",
  },
  {
    id: 10,
    title: "The Rise of Remote Patient Monitoring",
    excerpt: "How IoT devices and AI are enabling continuous health monitoring at home, improving chronic disease management and reducing hospital readmissions...",
    category: "Healthcare Innovation",
    readTime: "9 min read",
    date: "2024-01-29",
  },
  {
    id: 11,
    title: "3D Bioprinting: Manufacturing the Future of Medicine",
    excerpt: "From printed organs to personalized medical implants, explore how 3D bioprinting is transforming regenerative medicine and surgical procedures...",
    category: "Medical Innovation",
    readTime: "11 min read",
    date: "2024-01-28",
  },
  {
    id: 12,
    title: "Longevity Medicine: The Science of Aging Well",
    excerpt: "Explore cutting-edge research in longevity medicine, from senolytic therapies to epigenetic reprogramming, and their potential to extend healthy lifespan...",
    category: "Anti-Aging",
    readTime: "10 min read",
    date: "2024-01-27",
  }
]

export default function BlogPage() {
  useEffect(() => {
    const cards = document.querySelectorAll(".blog-card")

    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12 font-montserrat">Healthcare & AI Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <Card className="blog-card hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {post.category} • {post.readTime}
                </div>
                <CardTitle className="font-montserrat">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-merriweather text-muted-foreground">{post.excerpt}</p>
                <p className="text-sm text-muted-foreground mt-4">{new Date(post.date).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}