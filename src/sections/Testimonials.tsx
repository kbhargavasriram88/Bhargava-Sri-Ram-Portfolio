"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Users, CheckCircle, Star, Heart } from "lucide-react";
import { FaQuoteLeft } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  testimonials: any[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback data if empty, mimicking the image exactly
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      name: "Rohit Sharma",
      role: "Founder, TechNova",
      type: "Client",
      content: "Bhargava is an exceptional developer who consistently delivers high-quality work. His attention to detail, problem-solving skills, and dedication to excellence are truly impressive.",
      rating: 5,
      imageUrl: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Priya Nair",
      role: "Project Manager, InnoSoft",
      type: "Colleague",
      content: "Working with Bhargava on our project was a great experience. He understands requirements quickly and turns ideas into real-world solutions.",
      rating: 5,
      imageUrl: "https://i.pravatar.cc/150?u=2",
    },
    {
      name: "Arjun Patel",
      role: "AI Engineer, DataMind Labs",
      type: "Mentor",
      content: "Bhargava's passion for AI/ML and full-stack development is unmatched. He's a quick learner and always brings innovative ideas to the table.",
      rating: 5,
      imageUrl: "https://i.pravatar.cc/150?u=3",
    },
    {
      name: "Sneha Verma",
      role: "CEO, GreenLeaf Organics",
      type: "Client",
      content: "He built our website from scratch with modern design and great performance. Highly professional and easy to work with!",
      rating: 5,
      imageUrl: "https://i.pravatar.cc/150?u=4",
    }
  ];

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
            <span className="text-lg">🌿</span> TESTIMONIALS <span className="text-lg">🌿</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            What People Say <br /> <span className="text-primary">About Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg pt-2">
            Here's what my clients, mentors, and colleagues have to say about working with me and my projects.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group max-w-[1400px] mx-auto">
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[320px] md:min-w-[380px] snap-center p-2"
              >
                <div className="h-full bg-white/30 dark:bg-black/20 backdrop-blur-3xl border border-white/50 border-t-white/80 border-l-white/80 dark:border-white/10 dark:border-t-white/20 dark:border-l-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col relative overflow-hidden group/card hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover/card:opacity-[0.08] transition-opacity">
                    <FaQuoteLeft className="w-48 h-48" />
                  </div>
                  
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    <FaQuoteLeft className="w-5 h-5" />
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted")} />
                    ))}
                  </div>

                  <p className="text-foreground/80 leading-relaxed mb-8 flex-1 relative z-10">
                    {testimonial.content}
                  </p>

                  <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-border/50">
                    <img 
                      src={testimonial.imageUrl || `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {testimonial.type}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-background/50 hover:bg-primary hover:text-white backdrop-blur-md border border-border flex items-center justify-center transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {displayTestimonials.map((_, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === 0 ? "bg-primary w-4" : "bg-primary/30")} />
              ))}
            </div>
            <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-background/50 hover:bg-primary hover:text-white backdrop-blur-md border border-border flex items-center justify-center transition-all shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="max-w-4xl mx-auto mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-green-950/20 dark:bg-black/20 backdrop-blur-3xl border border-green-500/30 border-t-green-400/50 border-l-green-400/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(34,197,94,0.15)] dark:shadow-[0_8px_32px_rgba(34,197,94,0.1)] overflow-hidden relative"
          >
            {/* Subtle inner reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-green-500/20">
              <div className="flex flex-col items-center justify-center text-center">
                <Users className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-3xl font-black text-white mb-1">25+</h3>
                <p className="text-green-100/70 text-sm">Happy Clients</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-3xl font-black text-white mb-1">40+</h3>
                <p className="text-green-100/70 text-sm">Projects Completed</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Star className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-3xl font-black text-white mb-1">5.0</h3>
                <p className="text-green-100/70 text-sm">Average Rating</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Heart className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-3xl font-black text-white mb-1">100%</h3>
                <p className="text-green-100/70 text-sm">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
