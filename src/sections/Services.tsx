"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Users, Globe } from "lucide-react";
import * as Icons from "lucide-react";

interface ServicesSectionProps {
  services: any[];
}

export function ServicesSection({ services = [] }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background decoration to enhance glass effect */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-green-400/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-background/50 pointer-events-none -z-20" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground drop-shadow-md">
            Services
          </h2>
          <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service: any, index: number) => {
            const Icon = (Icons as any)[service.icon] || Globe;
            const titleParts = service.title.split(" ");
            const mainTitle = titleParts[0];
            const subTitle = titleParts.slice(1).join(" ") || "PACKAGE";

            return (
              <motion.div
                key={service._id || service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group h-full"
              >
                <div className="h-full flex flex-col bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-3xl border border-black/10 dark:border-white/10 border-t-white/40 dark:border-t-white/20 border-l-white/40 dark:border-l-white/20 rounded-[2rem] p-8 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:border-green-500/60 dark:hover:border-green-400/60 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(34,197,94,0.2)] relative overflow-hidden">
                  
                  {/* Glowing Top Border Effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-green-500 dark:via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="mx-auto w-20 h-20 rounded-full border-2 border-green-600/40 dark:border-green-500/40 flex items-center justify-center mb-6 relative group-hover:border-green-500 dark:group-hover:border-green-400 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.1)] dark:shadow-[0_0_15px_rgba(34,197,94,0.2)] inset-0">
                    <Icon className="w-10 h-10 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors" strokeWidth={1.5} />
                  </div>

                  {/* Title & Price */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider">{mainTitle}</h3>
                    <p className="text-sm font-bold text-green-600 dark:text-green-500 tracking-[0.2em] mb-4 uppercase">{subTitle}</p>
                    
                    {service.basePrice > 0 ? (
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter">
                          ₹{service.basePrice.toLocaleString('en-IN')}
                          {mainTitle.toLowerCase().includes('custom') && '+'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white tracking-wider uppercase">Price Based On</span>
                        <span className="text-xl font-bold text-green-600 dark:text-green-500 tracking-wider uppercase mt-1">Requirements</span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-green-600/20 dark:via-green-500/20 to-transparent" />
                    <span className="relative px-3 text-[10px] font-bold text-green-700 dark:text-green-500/80 uppercase tracking-widest bg-white/80 dark:bg-black/40 rounded-full backdrop-blur-sm border border-black/5 dark:border-none">Includes:</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {service.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500/70 shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link 
                    href="#contact" 
                    className="mt-auto flex items-center justify-center w-full py-3.5 rounded-2xl border border-green-600/40 dark:border-green-500/40 text-green-700 dark:text-green-400 font-bold hover:bg-green-500/10 hover:border-green-600 dark:hover:border-green-400 transition-all duration-300 group/btn"
                  >
                    Choose Package 
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Bar Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          {/* Trust Badges */}
          <div className="w-full max-w-4xl bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-3xl border border-black/10 dark:border-white/10 border-t-white/40 dark:border-t-white/20 border-l-white/40 dark:border-l-white/20 rounded-full py-4 px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            
            <div className="flex items-center gap-3 text-gray-800 dark:text-white font-bold tracking-wide text-sm sm:text-base uppercase">
              <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" strokeWidth={2} />
              Quality Websites
            </div>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-600/50 dark:bg-green-500/50" />
            
            <div className="flex items-center gap-3 text-gray-800 dark:text-white font-bold tracking-wide text-sm sm:text-base uppercase">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" strokeWidth={2} />
              Timely Delivery
            </div>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-600/50 dark:bg-green-500/50" />
            
            <div className="flex items-center gap-3 text-gray-800 dark:text-white font-bold tracking-wide text-sm sm:text-base uppercase">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" strokeWidth={2} />
              Client Satisfaction
            </div>

          </div>

          {/* Final CTA */}
          <Link 
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-b from-green-500 to-green-600 dark:from-green-400/20 dark:to-green-600/50 border border-green-400 dark:border-green-500/50 rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/20 dark:from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Let's Work Together
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
