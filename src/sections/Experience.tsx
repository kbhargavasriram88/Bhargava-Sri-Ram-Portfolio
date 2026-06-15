"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Trophy } from "lucide-react";

interface ExperienceSectionProps {
  experience: any[];
}

export function ExperienceSection({ experience = [] }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Experience & Leadership</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My professional journey and leadership roles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-primary/20 pl-6 ml-4 md:ml-0 md:pl-0 md:border-l-0">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            
            {experience.map((exp: any, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <div key={exp.title} className="relative mb-12 md:flex items-center justify-between w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-8 md:left-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary md:-translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                  {/* Content Container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`md:w-[45%] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}
                  >
                    <Card className="hover:shadow-md transition-shadow border-primary/10">
                      <CardContent className={`p-6 flex flex-col gap-2 ${isEven ? "md:items-end" : "md:items-start"}`}>
                        <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-medium w-fit">
                          {exp.type === "Leadership" ? <Trophy className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          {exp.type}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-3 text-sm text-muted-foreground font-medium">
                          <span>{exp.organization}</span>
                          <span className="hidden md:inline">•</span>
                          <span className="text-primary/80">{exp.duration}</span>
                        </div>
                        <p className={`text-muted-foreground mt-2 text-sm leading-relaxed ${isEven ? "md:text-right" : "md:text-left"}`}>
                          {exp.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
