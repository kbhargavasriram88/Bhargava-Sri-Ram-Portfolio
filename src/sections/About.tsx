"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Route } from "lucide-react";

interface AboutSectionProps {
  settings: any;
}

export function AboutSection({ settings }: AboutSectionProps) {
  const about = settings?.about || {
    journey: "Started coding out of curiosity, evolved into a passion. I specialize in full-stack development with a strong focus on modern JavaScript frameworks and scalable backend architectures. Always eager to explore AI/ML integrations.",
    careerGoals: "My objective is to build impactful products that solve real-world problems. I am looking forward to collaborating with innovative teams, acquiring new skills, and contributing to open-source communities.",
    education: [
      { title: "B.Tech CSE AI & ML", status: "Present" },
      { title: "Intermediate", status: "Completed" },
      { title: "SSC", status: "Completed" }
    ]
  };

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">About Me</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A passionate developer dedicated to building elegant, scalable, and user-centric solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Route className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {about.journey}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Career Goals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {about.careerGoals}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Card className="h-full hover:shadow-lg transition-shadow border-primary/10 bg-primary/5">
              <CardContent className="p-6 space-y-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Education Timeline</h3>
                
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {about.education.map((edu: any, index: number) => (
                    <div key={index} className="relative pl-6 md:pl-0 md:flex md:even:flex-row-reverse group">
                      {/* Mobile dot */}
                      <span className="md:hidden absolute left-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />
                      
                      {/* Desktop dot */}
                      <span className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />
                      
                      <div className="md:w-1/2 md:pr-8 md:even:pl-8 md:even:pr-0 md:text-right md:even:text-left">
                        <h4 className="font-semibold">{edu.title}</h4>
                        <p className="text-sm text-muted-foreground">{edu.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
